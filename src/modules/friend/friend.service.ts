import { prisma } from '../../utils'

export async function createFriend(currentUserId: number, friendId: number) {
  return prisma.friend.create({
    data: {
      userId: currentUserId,
      friendId,
    },
  })
}

export async function getFriendByUniqueId(currentUserId: number, friendId: number) {
  return prisma.friend.findUnique({
    where: {
      userId_friendId: {
        userId: currentUserId,
        friendId,
      },
    },
  })
}

export async function getFriendsByUserId(userId: number) {
  return prisma.friend.findMany({
    where: {
      userId,
      disabled: false,
    },
    include: {
      friend: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
  })
}
