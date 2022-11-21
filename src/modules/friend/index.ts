import type { FastifyInstance } from 'fastify'
import { map } from 'lodash'
import { prisma } from '../../utils'
import { FriendParams, FriendParamsType } from './schema'

export default async function friendRoute(fastify: FastifyInstance) {
  fastify.addHook('onRequest', fastify.authenticate)

  fastify.get('/', async (req) => {
    const friends = await prisma.friend.findMany({
      where: {
        userId: req.user.id,
        disabled: false,
      },
      include: {
        friend: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      take: 10,
    })

    return map(friends, 'friend')
  })

  fastify.post<{ Params: FriendParamsType }>(
    '/:friendId',
    {
      schema: {
        params: FriendParams,
      },
    },
    async (req, reply) => {
      const { friendId } = req.params
      const _friend = await prisma.friend.findUnique({
        where: {
          userId_friendId: {
            userId: req.user.id,
            friendId: friendId,
          },
        },
      })
      if (_friend) {
        return
      }
      const friend = await prisma.friend.create({
        data: {
          userId: req.user.id,
          friendId: friendId,
        },
      })
      reply.status(201).send(friend)
    }
  )
}
