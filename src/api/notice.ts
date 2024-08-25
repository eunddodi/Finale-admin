import { customFetch } from "@/lib/fetch"

export const getNotice = async () => {
  const { data } = await customFetch('api/lesson/notice')
  return data
}

export const updateNotice = async (notice: string, token: string) => {
  const { data } = await customFetch('api/coach/createNotice',
    token,
    {
      method: 'POST',
      body: JSON.stringify({ contents: notice })
    })
  return data
}

export const uploadTimetableImage = async (file: File, token: string) => {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await customFetch(
    'api/upload/timetable',
    token,
    {
      method: 'POST',
      body: { file: formData }
    }
  )

  return data
}

export const getTimetableImage = async () => {
  const { data } = await customFetch('api/lesson/timetable')
  return data
}

// 문자 문구 조회
// 문자 문구 수정

// 이미지 수정