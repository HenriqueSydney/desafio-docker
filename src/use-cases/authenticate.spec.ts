import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { IUsersRepository } from '@/repositories/users-repository'

import { AuthenticateUseCase } from './authenticate'

import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: IUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const email = 'johndoe@exemple.com'

    const password = '123456'

    await usersRepository.create({
      name: 'John Doe',
      email,
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email,
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const email = 'johndoe@exemple.com'

    const password = '123456'

    await expect(() =>
      sut.execute({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong email', async () => {
    const email = 'johndoe@exemple.com'

    const password = '123456'

    await usersRepository.create({
      name: 'John Doe',
      email,
      password_hash: await hash('1234567', 6),
    })

    await expect(() =>
      sut.execute({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
