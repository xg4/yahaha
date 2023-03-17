import { Static, Type } from '@sinclair/typebox'

export const SignupInput = Type.Object({
  username: Type.String(),
  password: Type.String(),
})
export type SignupInput = Static<typeof SignupInput>

export const LoginInput = Type.Object({
  username: Type.String(),
  password: Type.String(),
})
export type LoginInput = Static<typeof LoginInput>
