import { Static, Type } from '@sinclair/typebox'

export const FriendParams = Type.Object({
  friendId: Type.Integer(),
})

export type FriendParamsType = Static<typeof FriendParams>
