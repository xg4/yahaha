import { Static, Type } from '@sinclair/typebox'

export const CreateFriendInput = Type.Object({
  friendId: Type.Integer(),
})

export type CreateFriendInput = Static<typeof CreateFriendInput>
