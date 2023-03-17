import type { FastifyInstance } from 'fastify'
import {
  createMessageHandler,
  getMessageCountHandler,
  getMessageHandler,
  updateMessageStatusHandler,
} from './message.controller'
import { CreateMessageInput, QueryMessageInput } from './message.schema'

export default async function messageRoutes(server: FastifyInstance) {
  server.addHook('onRequest', server.authenticate)

  server.get(
    '/',
    {
      schema: {
        querystring: QueryMessageInput,
      },
    },
    getMessageHandler,
  )

  server.get(
    '/count',
    {
      schema: {
        querystring: QueryMessageInput,
      },
    },
    getMessageCountHandler,
  )

  server.patch(
    '/status',
    {
      schema: {
        body: QueryMessageInput,
      },
    },
    updateMessageStatusHandler,
  )

  server.post(
    '/',
    {
      schema: {
        body: CreateMessageInput,
      },
    },
    createMessageHandler,
  )
}
