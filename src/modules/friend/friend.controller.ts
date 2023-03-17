import type { FastifyReply, FastifyRequest } from 'fastify'
import { map } from 'lodash'
import type { CreateFriendInput } from './friend.schema'
import { createFriend, getFriendByUniqueId, getFriendsByUserId } from './friend.service'

export async function createFriendHandler(req: FastifyRequest<{ Params: CreateFriendInput }>, reply: FastifyReply) {
  const _friend = await getFriendByUniqueId(req.user.id, req.params.friendId)
  if (_friend) {
    return
  }
  const friend = await createFriend(req.user.id, req.params.friendId)
  reply.status(201).send(friend)
}

export async function getFriendsHandler(req: FastifyRequest) {
  const friends = await getFriendsByUserId(req.user.id)

  return map(friends, 'friend')
}
