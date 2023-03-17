import type { Prisma } from '@prisma/client'
import { prisma } from '../../utils'

export async function createSocket(input: Prisma.SocketUncheckedCreateInput) {
  return prisma.socket.create({
    data: input,
  })
}

export async function findUserById(userId: number) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
}

export async function deleteSocketById(socketId: string) {
  return prisma.socket.delete({
    where: {
      id: socketId,
    },
  })
}

export async function clearSockets() {
  prisma.socket.deleteMany()
}
