import { IUsersRepository } from '@/repositories/users-repository'

import { User } from '@prisma/client'

import { ResourceNotFoundError } from './errors/resource-not-found'

interface IGetUserProfileUseCaseRequest {
  userId: string
}

interface IGetUserProfileCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({
    userId,
  }: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
