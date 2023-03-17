import type { FastifyInstance } from 'fastify'
import { getUserHandler } from './user.controller'
import { QueryUserInput } from './user.schema'

export default async function userRoutes(server: FastifyInstance) {
  server.get(
    '/:username',
    {
      schema: {
        params: QueryUserInput,
      },
    },
    getUserHandler,
  )
}
