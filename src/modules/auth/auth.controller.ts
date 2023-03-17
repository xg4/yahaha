import type { FastifyReply, FastifyRequest } from 'fastify'
import { getJwtPayload, isValidPassword } from '../../utils'
import type { LoginInput, SignupInput } from './auth.schema'
import { createUser, findUserById, findUserByUsername } from './auth.service'

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput
  }>,
  reply: FastifyReply,
) {
  const body = request.body

  const user = await findUserByUsername(body.username)

  if (!user) {
    reply.badRequest('用户名或密码错误')
    return
  }

  const correctPassword = await isValidPassword(body.password, user.password)

  if (!correctPassword) {
    reply.badRequest('用户名或密码错误')
    return
  }

  const accessToken = await reply.jwtSign(getJwtPayload(user))
  reply.status(200).send({ accessToken })
}

export async function signupHandler(
  request: FastifyRequest<{
    Body: SignupInput
  }>,
  reply: FastifyReply,
) {
  const { username } = request.body

  const user = await findUserByUsername(username)
  if (user) {
    reply.badRequest('用户名已存在')
    return
  }
  try {
    const user = await createUser(request.body)

    const accessToken = await reply.jwtSign(getJwtPayload(user))
    reply.status(201).send({ accessToken })
  } catch (e) {
    console.log(e)
    reply.code(500).send(e)
  }
}

/**
 * 获取当前登录用户信息
 * @param request
 * @param reply
 * @returns
 */
export async function getUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const user = await findUserById(request.user.id)

  if (!user) {
    reply.unauthorized('无效用户')
    return
  }
  return user
}
