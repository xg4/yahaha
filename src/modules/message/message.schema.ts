import { Static, Type } from '@sinclair/typebox'

export const QueryMessageInput = Type.Object({
  messageId: Type.Optional(Type.Integer()),
  userId: Type.Integer(),
  take: Type.Optional(Type.Integer()),
})

export type QueryMessageInput = Static<typeof QueryMessageInput>

export const CreateMessageInput = Type.Object({
  content: Type.String(),
  userId: Type.Integer(),
  uuid: Type.String({ format: 'uuid' }),
})

export type CreateMessageInput = Static<typeof CreateMessageInput>
