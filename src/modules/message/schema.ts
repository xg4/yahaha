import { Static, Type } from '@sinclair/typebox'

export const GetMessageQuery = Type.Object({
  messageId: Type.Optional(Type.Integer()),
  userId: Type.Integer(),
  take: Type.Optional(Type.Integer()),
})

export type GetMessageQueryType = Static<typeof GetMessageQuery>

export const SaveMessageBody = Type.Object({
  content: Type.String(),
  userId: Type.Integer(),
  uuid: Type.String({ format: 'uuid' }),
})

export type SaveMessageBodyType = Static<typeof SaveMessageBody>
