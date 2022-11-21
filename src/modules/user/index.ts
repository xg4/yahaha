import type { FastifyInstance } from 'fastify'
import { prisma } from '../../utils'
import { GetUserParams, GetUserParamsType } from './schema'

export default async function userRoute(fastify: FastifyInstance) {
  fastify.addHook('onRequest', fastify.authenticate)

  fastify.get('/me', async (req, reply) => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    })
    if (!user) {
      reply.unauthorized('无效用户')
      return
    }
    return user
  })

  fastify.get<{ Params: GetUserParamsType }>(
    '/:username',
    {
      schema: {
        params: GetUserParams,
      },
    },
    async (req, reply) => {
      const user = await prisma.user.findFirst({
        where: {
          username: {
            equals: req.params.username,
            mode: 'insensitive',
          },
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      })
      if (!user) {
        reply.notFound('用户不存在')
        return
      }

      return user
    }
  )
}
