import { Static, Type } from '@sinclair/typebox'

export const LoginBody = Type.Object({
  username: Type.String(),
  password: Type.String(),
})

export type LoginBodyType = Static<typeof LoginBody>

export const SignupBody = LoginBody

export type SignupBodyType = Static<typeof SignupBody>
