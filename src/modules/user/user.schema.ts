import { Static, Type } from '@sinclair/typebox'

export const QueryUserInput = Type.Object({
  username: Type.String(),
})

export type QueryUserInput = Static<typeof QueryUserInput>
