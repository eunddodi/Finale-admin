import { customFetch } from "@/lib/fetch"
import { ILocation } from "./types"

export const getLocations = async (): Promise<ILocation[]> => {
  const { data } = await customFetch('api/location/list')
  return data
}


// 수업 장소 추가

// 수업 장소 삭제