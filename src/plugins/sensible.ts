import fastifySensible from '@fastify/sensible'
import fp from 'fastify-plugin'

export default fp(async function (fastify) {
  fastify.register(fastifySensible)
})
