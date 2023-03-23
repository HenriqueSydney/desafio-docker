import { Prisma, User } from '@prisma/client'

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>
  findById(userId: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
