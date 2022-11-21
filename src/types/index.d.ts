import '@fastify/jwt'
import '@fastify/sensible'
import type { User } from '@prisma/client'
import 'fastify-socket.io'

declare global {
  type JwtUser = Pick<User, 'id' | 'username'>
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JwtUser
    user: JwtUser
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate(): Promise<void>
    config: {
      PORT: number
      JWT_SECRET: string
    }
  }
}

declare module 'socket.io' {
  interface Socket {
    user: User
  }
}
