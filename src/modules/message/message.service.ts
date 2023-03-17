import { MessageStatus } from '@prisma/client'
import type { JwtUser } from '../../types'
import { prisma } from '../../utils'
import type { CreateMessageInput, QueryMessageInput } from './message.schema'

export async function findConversationSockets(currentUserId: number, targetUserId: number) {
  return prisma.socket.findMany({
    where: {
      OR: [{ userId: targetUserId }, { userId: currentUserId }],
    },
  })
}

export async function createMessage(senderId: number, input: CreateMessageInput) {
  return prisma.message.create({
    data: {
      senderId: senderId,
      receiverId: input.userId,
      content: input.content,
      uuid: input.uuid,
    },
  })
}

export async function findMessageByUuid(uuid: string) {
  return prisma.message.findUnique({
    where: {
      uuid,
    },
  })
}

export async function updateMessageStatus(user: JwtUser, input: QueryMessageInput) {
  const { userId, messageId } = input

  return prisma.message.updateMany({
    where: {
      senderId: userId,
      receiverId: user.id,
      id: {
        lte: messageId!,
      },
      status: {
        not: MessageStatus.READ,
      },
    },
    data: {
      status: MessageStatus.READ,
    },
  })
}

export async function findMessagesUnreadCount(user: JwtUser, input: QueryMessageInput) {
  return prisma.message.count({
    where: {
      senderId: input.userId,
      receiverId: user.id,
      status: {
        not: MessageStatus.READ,
      },
    },
  })
}

export async function findMessages(user: JwtUser, input: QueryMessageInput) {
  const { messageId, userId, take = 10 } = input

  return prisma.message.findMany({
    where: {
      ...(messageId
        ? {
            id: {
              lt: messageId,
            },
          }
        : {}),
      OR: [
        {
          senderId: userId,
          receiverId: user.id,
        },
        {
          senderId: user.id,
          receiverId: userId,
        },
      ],
    },
    orderBy: {
      id: 'desc',
    },
    take,
  })
}
