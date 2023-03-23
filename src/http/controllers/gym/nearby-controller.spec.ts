import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    const nearGymLatitude = -15.8398519
    const nearGymLongitude = -48.0223513

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '16516516+6',
        latitude: nearGymLatitude,
        longitude: nearGymLongitude,
      })

    const farGymLatitude = -15.80008
    const farGymLongitude = -47.8680213

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'Some description',
        phone: '16516516+6',
        latitude: farGymLatitude,
        longitude: farGymLongitude,
      })

    const myLocationLatitude = -15.8430823
    const myLocationLongitude = -48.0307709

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: myLocationLatitude,
        longitude: myLocationLongitude,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })
})
