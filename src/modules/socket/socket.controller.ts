import type { User } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import { isString } from 'lodash'
import type { Socket } from 'socket.io'
import type { JwtUser } from '../../types'
import { clearSockets, createSocket, deleteSocketById, findUserById } from './socket.service'

declare module 'socket.io' {
  interface Socket {
    user: User
  }
}

export async function connectHandler(socket: Socket) {
  const userAgent = socket.request.headers['user-agent']
  await createSocket({
    id: socket.id,
    userId: socket.user.id,
    userAgent: userAgent ?? null,
    ip: socket.handshake.address,
  })

  socket.on('disconnect', async () => {
    await deleteSocketById(socket.id)
  })
}

export async function initSocket(server: FastifyInstance) {
  await server.ready()

  await clearSockets()

  server.io.use(async (socket, next) => {
    const { token } = socket.handshake.auth
    try {
      if (isString(token)) {
        const jwtUser = server.jwt.verify<JwtUser>(token)
        const user = await findUserById(jwtUser.id)
        if (user) {
          socket.user = user
          return next()
        }
      }
    } catch {}

    next(server.httpErrors.unauthorized('请登录！'))
  })

  server.io.on('connection', connectHandler)
}
