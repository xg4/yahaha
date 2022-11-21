import fastifyCors from '@fastify/cors'
import fp from 'fastify-plugin'

export default fp(async function (fastify) {
  fastify.register(fastifyCors, {
    origin: (origin, cb) => {
      if (!origin) {
        cb(new Error('Not allowed'), false)
        return
      }

      const hostname = new URL(origin).hostname
      if (hostname === 'localhost') {
        //  Request from localhost will pass
        cb(null, true)
        return
      }
      cb(null, true)

      // Generate an error on other origins, disabling access
      // cb(new Error('Not allowed'), false)
    },
  })
})
