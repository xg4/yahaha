import type { FastifyInstance } from 'fastify'
import { getUserHandler, loginHandler, signupHandler } from './auth.controller'
import { LoginInput, SignupInput } from './auth.schema'

export default async function authRoutes(server: FastifyInstance) {
  server.post(
    '/signup',
    {
      schema: {
        body: SignupInput,
      },
    },
    signupHandler,
  )

  server.post(
    '/login',
    {
      schema: {
        body: LoginInput,
      },
    },
    loginHandler,
  )

  server.get(
    '/me',
    {
      preHandler: [server.authenticate],
    },
    getUserHandler,
  )
}
