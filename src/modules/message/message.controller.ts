import type { FastifyReply, FastifyRequest } from 'fastify'
import { map } from 'lodash'
import type { CreateMessageInput, QueryMessageInput } from './message.schema'
import {
  createMessage,
  findConversationSockets,
  findMessageByUuid,
  findMessages,
  findMessagesUnreadCount,
  updateMessageStatus,
} from './message.service'

export async function createMessageHandler(
  req: FastifyRequest<{
    Body: CreateMessageInput
  }>,
  reply: FastifyReply,
) {
  const _msg = await findMessageByUuid(req.body.uuid)

  if (_msg) {
    reply.badRequest('消息 id 重复')
    return
  }

  // TODO: 查询好友关系

  const msg = await createMessage(req.user.id, req.body)
  const sockets = await findConversationSockets(req.user.id, req.body.userId)
  if (sockets.length) {
    reply.io.to(map(sockets, 'id')).emit('message', msg)
  }
  reply.status(201).send(msg)
}

export async function updateMessageStatusHandler(
  req: FastifyRequest<{
    Body: QueryMessageInput
  }>,
) {
  updateMessageStatus(req.user, req.body)
}

export async function getMessageHandler(
  req: FastifyRequest<{
    Querystring: QueryMessageInput
  }>,
) {
  return findMessages(req.user, req.query)
}

export async function getMessageCountHandler(
  req: FastifyRequest<{
    Querystring: QueryMessageInput
  }>,
) {
  return findMessagesUnreadCount(req.user, req.query)
}
