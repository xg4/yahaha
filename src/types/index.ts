import type { User } from '@prisma/client'

export type JwtUser = Pick<User, 'id' | 'username'>
