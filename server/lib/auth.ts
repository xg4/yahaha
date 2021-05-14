import { PrismaClient } from '.prisma/client';
import { IncomingMessage } from 'http';
import { getSession } from 'next-auth/client';

const prisma = new PrismaClient();

export async function getCurrentUser(req: IncomingMessage) {
  try {
    const session = await getSession({ req });

    if (!session || !session.userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.userId as number,
      },
    });
    return user;
  } catch {
    return null;
  }
}
