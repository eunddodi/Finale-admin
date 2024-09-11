export interface ILocation {
  id: number
  name: string
  city: string
  district: string
  address: string
}

export interface CreateLocationDto extends Omit<ILocation, 'id'> { }