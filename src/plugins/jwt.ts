import fastifyJwt from '@fastify/jwt'
import type { FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'

export default fp(async function (fastify) {
  fastify.register(fastifyJwt, {
    secret: fastify.config.JWT_SECRET,
  })

  fastify.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply.unauthorized('请先登录')
      }
    }
  )
})
