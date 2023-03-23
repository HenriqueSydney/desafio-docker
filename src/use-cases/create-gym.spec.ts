import { describe, it, expect, beforeEach } from 'vitest'

import { IGymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { CreateGymUseCase } from './create-gym'

let gymsRepository: IGymsRepository
let sut: CreateGymUseCase

const defaultGymLatitudeForTesting = -15.8271869
const defaultGymLongitudeForTesting = -47.9867827

describe('CreateGym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to CreateGym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: defaultGymLatitudeForTesting,
      longitude: defaultGymLongitudeForTesting,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
