import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

const nearGymLatitude = -15.8398519
const nearGymLongitude = -48.0223513

const farGymLatitude = -15.80008
const farGymLongitude = -47.8680213

const myLocationLatitude = -15.8430823
const myLocationLongitude = -48.0307709

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: nearGymLatitude,
      longitude: nearGymLongitude,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: farGymLatitude,
      longitude: farGymLongitude,
    })

    const { gyms } = await sut.execute({
      userLatitude: myLocationLatitude,
      userLongitude: myLocationLongitude,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
