import { customFetch } from "@/lib/fetch"
import { ILocation } from "./types"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import useToken from "@/hooks/useToken"

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

export const useAddLocation = () => {
  const token = useToken()
  const addLocation = async (locationData: Omit<ILocation, 'id'>): Promise<void> => {
    await customFetch('api/location/create', token, {
      method: 'POST',
      body: JSON.stringify(locationData)
    })
  }

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] })
    },
  })
}

// 수업 장소 삭제