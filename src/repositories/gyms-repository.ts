import { Gym, Prisma } from '@prisma/client'

export interface IFindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface IGymsRepository {
  findById(gymId: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearBy(params: IFindManyNearbyParams): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
