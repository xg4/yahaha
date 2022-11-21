import { Static, Type } from '@sinclair/typebox'

export const GetUserParams = Type.Object({
  username: Type.String(),
})

export type GetUserParamsType = Static<typeof GetUserParams>
