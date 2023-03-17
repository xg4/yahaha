import fastifyCors from '@fastify/cors'
import fastifySensible from '@fastify/sensible'
import dayjs from 'dayjs'
import fastify from 'fastify'
import { pick } from 'lodash'
import pkg from '../package.json'
import authRoutes from './modules/auth/auth.route'
import friendRoutes from './modules/friend/friend.route'
import messageRoutes from './modules/message/message.route'
import socketRoutes from './modules/socket/socket.route'
import userRoutes from './modules/user/user.route'
import jwtPlugin from './plugins/jwt'
import socketPlugin from './plugins/socket'

const app = fastify({
  logger: true,
})

// plugins
app.register(fastifySensible)
app.register(fastifyCors)
app.register(jwtPlugin)
app.register(socketPlugin, { cors: { origin: '*' } })

// application version
app.get('/', async () => {
  return pick(pkg, ['name', 'version'])
})

// application status
app.get('/status', async () => {
  return { status: 'OK', date: dayjs().format() }
})

// routes
app.register(authRoutes, { prefix: 'api/auth' })
app.register(userRoutes, { prefix: 'api/users' })
app.register(socketRoutes, { prefix: 'api/sockets' })
app.register(messageRoutes, { prefix: 'api/messages' })
app.register(friendRoutes, { prefix: 'api/friends' })

const port = parseInt(process.env['PORT'] ?? '3000')
app.listen({ port }, function (err) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
