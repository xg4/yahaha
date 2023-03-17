import fastifyJwt from '@fastify/jwt'
import type { FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import type { JwtUser } from '../types'

declare module 'fastify' {
  interface FastifyInstance {
    authenticate(): Promise<void>
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: JwtUser
  }
}

const jwtPlugin = fp(async function (server) {
  server.register(fastifyJwt, {
    secret: process.env['JWT_SECRET']!,
  })

  server.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.unauthorized('请登录！')
    }
  })
})

export default jwtPlugin
