import { customFetch } from "@/lib/fetch"
import { CopyDTO, CreateDTO, UpdateDTO } from "./types"
import { useSuspenseQuery } from "@tanstack/react-query"

interface UseLessonsParams {
  date: string
  location?: string
  token: string
}


export interface UseLessonsResponse {
  lessonId: number
  title: string
  startTime: string
  endTime: string
}

export const useLessons = ({ date, location, token }: UseLessonsParams) => {
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

export const getLessonDetail = async (id: number, token: string) => {
  const { data } = await customFetch(`api/coach/lesson/${id}`, token)
  return data
}

// ELSE

export const copyLessons = async (dto: CopyDTO, token: string) => {
  const { data } = await customFetch('api/coach/lesson/copy', token, {
    method: 'POST',
    body: JSON.stringify(dto),
  })
  return data
}

export const createLesson = async (dto: CreateDTO, token: string) => {
  const { data } = await customFetch('api/coach/createLesson', token, {
    method: 'POST',
    body: JSON.stringify(dto),
  })
  return data
}

export const updateLesson = async (dto: UpdateDTO, token: string) => {
  const { data } = await customFetch('api/coach/lessonChange', token, {
    method: 'POST',
    body: JSON.stringify(dto),
  })
  return data
}
