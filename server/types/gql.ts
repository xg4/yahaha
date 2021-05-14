import { PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';

export interface GQLCtx {
  prisma: PrismaClient;
  res: Response;
  req: Request;
  user?: User;
}
