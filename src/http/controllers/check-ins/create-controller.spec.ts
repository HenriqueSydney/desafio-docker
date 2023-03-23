import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const defaultGymLatitudeForTesting = -15.8271869
    const defaultGymLongitudeForTesting = -47.9867827

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: defaultGymLatitudeForTesting,
        longitude: defaultGymLongitudeForTesting,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: defaultGymLatitudeForTesting,
        longitude: defaultGymLongitudeForTesting,
      })

    expect(response.statusCode).toEqual(201)
  })
})
