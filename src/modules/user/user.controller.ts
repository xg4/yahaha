import type { FastifyReply, FastifyRequest } from 'fastify'
import type { QueryUserInput } from './user.schema'
import { findUserByUsername } from './user.service'

export async function getUserHandler(
  request: FastifyRequest<{
    Params: QueryUserInput
  }>,
  reply: FastifyReply,
) {
  const user = await findUserByUsername(request.params.username)
  if (!user) {
    reply.notFound('用户不存在')
    return
  }

  return user
}
