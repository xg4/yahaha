import type { FastifyInstance } from 'fastify'
import { initSocket } from './socket.controller'

export default async function socketRoutes(server: FastifyInstance) {
  initSocket(server)
}
