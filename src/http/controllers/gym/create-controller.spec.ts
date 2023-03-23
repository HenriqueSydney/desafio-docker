import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Create a Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    const defaultGymLatitudeForTesting = -15.8271869
    const defaultGymLongitudeForTesting = -47.9867827
    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '16516516+6',
        latitude: defaultGymLatitudeForTesting,
        longitude: defaultGymLongitudeForTesting,
      })

    expect(response.statusCode).toEqual(201)
  })
})
