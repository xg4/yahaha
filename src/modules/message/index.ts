import { MessageStatus } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import { map } from 'lodash'
import { prisma } from '../../utils'
import {
  GetMessageQuery,
  GetMessageQueryType,
  SaveMessageBody,
  SaveMessageBodyType,
} from './schema'

export default async function messageRoute(fastify: FastifyInstance) {
  fastify.addHook('onRequest', fastify.authenticate)

  fastify.get<{
    Querystring: GetMessageQueryType
  }>(
    '/',
    {
      schema: {
        querystring: GetMessageQuery,
      },
    },
    async (req) => {
      const { messageId, userId, take = 10 } = req.query

      return prisma.message.findMany({
        where: {
          ...(messageId
            ? {
                id: {
                  lt: messageId,
                },
              }
            : {}),
          OR: [
            {
              senderId: userId,
              receiverId: req.user.id,
            },
            {
              senderId: req.user.id,
              receiverId: userId,
            },
          ],
        },
        orderBy: {
          id: 'desc',
        },
        take,
      })
    }
  )

  fastify.get<{
    Querystring: GetMessageQueryType
  }>(
    '/count',
    {
      schema: {
        querystring: GetMessageQuery,
      },
    },
    async (req) => {
      const { userId } = req.query

      return prisma.message.count({
        where: {
          senderId: userId,
          receiverId: req.user.id,
          status: {
            not: MessageStatus.READ,
          },
        },
      })
    }
  )

  fastify.patch<{
    Body: GetMessageQueryType
  }>(
    '/status',
    {
      schema: {
        body: GetMessageQuery,
      },
    },
    async (req) => {
      const { userId, messageId } = req.body

      return prisma.message.updateMany({
        where: {
          senderId: userId,
          receiverId: req.user.id,
          id: {
            lte: messageId!,
          },
          status: {
            not: MessageStatus.READ,
          },
        },
        data: {
          status: MessageStatus.READ,
        },
      })
    }
  )

  fastify.post<{
    Body: SaveMessageBodyType
  }>(
    '/',
    {
      schema: {
        body: SaveMessageBody,
      },
    },
    async function (req, reply) {
      const { content, userId, uuid } = req.body

      const _msg = await prisma.message.findUnique({
        where: {
          uuid,
        },
      })

      if (_msg) {
        reply.badRequest()
        return
      }

      // TODO: 查询好友关系

      const msg = await prisma.message.create({
        data: {
          senderId: req.user.id,
          receiverId: userId,
          content,
          uuid,
        },
      })
      const sockets = await prisma.socket.findMany({
        where: {
          OR: [{ userId }, { userId: req.user.id }],
        },
      })
      if (sockets.length) {
        fastify.io.to(map(sockets, 'id')).emit('message', msg)
      }
      reply.status(201).send(msg)
    }
  )
}
