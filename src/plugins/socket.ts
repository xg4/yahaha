import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import socketioServer from 'fastify-socket.io'
import { prisma } from '../utils'

export default fp(async function (fastify) {
  fastify.register(socketioServer, {
    cors: {
      origin: '*',
    },
  })

  initSocket(fastify)
})

async function initSocket(fastify: FastifyInstance) {
  await fastify.ready()

  await prisma.socket.deleteMany()

  fastify.io.use(async (socket, next) => {
    const { token } = socket.handshake.auth
    try {
      if (token) {
        const jwtUser = fastify.jwt.verify<JwtUser>(token)
        const user = await prisma.user.findUnique({
          where: {
            id: jwtUser.id,
          },
        })
        if (user) {
          socket.user = user
          return next()
        }
      }
    } catch {}

    next(new Error())
  })

  fastify.io.on('connection', async (socket) => {
    fastify.log.debug('Socket connect: ' + socket.id)

    const userAgent = socket.request.headers['user-agent']
    await prisma.socket.create({
      data: {
        id: socket.id,
        userId: socket.user.id,
        userAgent: userAgent ?? null,
        ip: socket.handshake.address,
      },
    })

    socket.on('disconnect', async () => {
      fastify.log.debug('Socket disconnect: ' + socket.id)
      await prisma.socket.delete({
        where: {
          id: socket.id,
        },
      })
    })
  })
}
