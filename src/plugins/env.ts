import fastifyEnv from '@fastify/env'
import fp from 'fastify-plugin'

const schema = {
  type: 'object',
  required: ['PORT', 'JWT_SECRET'],
  properties: {
    PORT: {
      type: 'string',
      default: 3000,
    },
    JWT_SECRET: {
      type: 'string',
    },
  },
}

const options = {
  dotenv: true,
  confKey: 'config',
  schema: schema,
}

export default fp(async function (fastify) {
  fastify.register(fastifyEnv, options)
})
