import { customFetch } from "@/lib/fetch"
import { ILocation } from "./types"
import { useSuspenseQuery } from "@tanstack/react-query"

export const useLocations = () => {
  const getLocations = async (): Promise<ILocation[]> => {
    const { data } = await customFetch('api/location/list')
    return data
  }

  return useSuspenseQuery<ILocation[]>({
    queryKey: ['locations'],
    queryFn: getLocations,
  })
}

// 수업 장소 추가

// 수업 장소 삭제