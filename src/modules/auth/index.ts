import type { FastifyInstance } from 'fastify'
import { pick } from 'lodash'
import { hashPassword, isValidPassword, prisma } from '../../utils'
import { LoginBody, LoginBodyType, SignupBody, SignupBodyType } from './schema'

export default async function authRoute(fastify: FastifyInstance) {
  fastify.post<{
    Body: LoginBodyType
  }>(
    '/login',
    {
      schema: {
        body: LoginBody,
      },
    },
    async (req, reply) => {
      const { username, password } = req.body

      const user = await prisma.user.findFirst({
        where: {
          username: {
            equals: username,
            mode: 'insensitive',
          },
        },
      })
      if (!user) {
        reply.badRequest('用户名或密码错误')
        return
      }

      if (!isValidPassword(password, user.password)) {
        reply.badRequest('用户名或密码错误')
        return
      }

      const token = fastify.jwt.sign(pick(user, ['id', 'username']))
      reply.send({ token })
    }
  )

  fastify.post<{
    Body: SignupBodyType
  }>(
    '/signup',
    {
      schema: {
        body: SignupBody,
      },
    },
    async (req, reply) => {
      const { username, password } = req.body

      const user = await prisma.user.findFirst({
        where: {
          username: {
            equals: username,
            mode: 'insensitive',
          },
        },
      })
      if (user) {
        reply.badRequest('用户名已存在')
        return
      }

      const hashPwd = await hashPassword(password)
      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashPwd,
        },
      })

      const token = fastify.jwt.sign(pick(newUser, ['id', 'username']))
      reply.status(201).send({ token })
    }
  )
}
