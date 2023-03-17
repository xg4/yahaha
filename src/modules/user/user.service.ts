import { prisma } from '../../utils'

export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  })
}
