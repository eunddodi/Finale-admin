import { customFetch } from "@/lib/fetch"
import { CopyDTO, CreateDTO, ILesson, UpdateDTO } from "./types"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import useToken from "@/hooks/useToken"

interface UseLessonsParams {
  date: string
  location?: string
}

export interface UseLessonsResponse {
  lessonId: number
  title: string
  startTime: string
  endTime: string
}

export const useLessons = ({ date, location }: UseLessonsParams) => {
  const token = useToken()
  const getLessonsByDateAndLocation = async (token: string, date?: string, location?: string,) => {
    const { data } = await customFetch(`api/lesson/withDateAndLocation?date=${date}&location=${location ?? ''}`, token, {
    })
    return data
  }

  return useSuspenseQuery<UseLessonsResponse[]>({
    queryKey: ['lessons', { date, location }],
    queryFn: () => getLessonsByDateAndLocation(token, date, location),
  })
}


export const useLessonDetail = (id?: number) => {
  const token = useToken()
  const getLessonDetail = async (id: number, token: string): Promise<ILesson> => {
    const { data } = await customFetch(`api/coach/lesson/${id}`, token)
    return data
  }
  return useSuspenseQuery({
    queryKey: ['lesson', id],
    queryFn: () => id ? getLessonDetail(id, token) : null,
  })
}

// ELSE

export const copyLessons = async (dto: CopyDTO, token: string) => {
  const { data } = await customFetch('api/coach/lesson/copy', token, {
    method: 'POST',
    body: JSON.stringify(dto),
  })
  return data
}

export const useCreateLesson = () => {
  const token = useToken()
  const createLesson = async ({ dto }: { dto: CreateDTO }) => {
    const { data } = await customFetch('api/coach/createLesson', token, {
      method: 'POST',
      body: JSON.stringify(dto),
    })
    return data
  }

  return useMutation({ mutationFn: createLesson })
}

export const useUpdateLesson = () => {
  const token = useToken()
  const updateLesson = async ({ dto }: { dto: UpdateDTO }) => {
    const { data } = await customFetch('api/coach/updateLesson', token, {
      method: 'POST',
      body: JSON.stringify(dto),
    })
    return data
  }

  return useMutation({ mutationFn: updateLesson })
}
