import type { User } from '@prisma/client'
import { pick } from 'lodash'
import type { JwtUser } from '../types'

export * from './prisma'
export * from './pwd'

export function getJwtPayload(user: Pick<User, 'id' | 'username'>): JwtUser {
  return pick(user, ['id', 'username'])
}
