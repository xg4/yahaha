import autoload from '@fastify/autoload'
import fastify from 'fastify'
import { join } from 'node:path'

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
    level: 'debug',
  },
})

app
  .register(autoload, {
    dir: join(__dirname, 'plugins'),
  })
  .register(autoload, {
    dir: join(__dirname, 'modules'),
    routeParams: true,
    dirNameRoutePrefix: true,
  })

app.get('/', (_request, reply) => {
  reply.send({ hello: 'world' })
})

app.listen({ host: '0.0.0.0', port: 3000 }, (err) => {
  if (err) throw err
})
