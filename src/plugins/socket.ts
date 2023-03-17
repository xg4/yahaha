import fp from 'fastify-plugin'
import { Server, ServerOptions } from 'socket.io'

declare module 'fastify' {
  interface FastifyInstance {
    io: Server
  }

  interface FastifyReply {
    io: Server
  }
}

const socketPlugin = fp(async function (fastify, opts?: Partial<ServerOptions>) {
  const io = new Server(fastify.server, opts)
  fastify.decorate('io', io)
  fastify.decorateReply('io', io)
  fastify.addHook('onClose', (fastify, done) => {
    fastify.io.close()
    done()
  })
})

export default socketPlugin
