import type { FastifyInstance } from 'fastify'
import { createFriendHandler, getFriendsHandler } from './friend.controller'
import { CreateFriendInput } from './friend.schema'

export default async function friendRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', fastify.authenticate)

  fastify.get('/', getFriendsHandler)

  fastify.post(
    '/:friendId',
    {
      schema: {
        params: CreateFriendInput,
      },
    },
    createFriendHandler,
  )
}
