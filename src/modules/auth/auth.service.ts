import { hashPassword, prisma } from '../../utils'
import type { SignupInput } from './auth.schema'

export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    },
  })
}

export async function createUser(input: SignupInput) {
  const { username, password } = input

  const hashPwd = await hashPassword(password)
  const user = await prisma.user.create({
    data: {
      username,
      password: hashPwd,
    },
  })

  return user
}

export async function findUserById(id: number) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  })
}
