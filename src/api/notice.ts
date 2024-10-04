import useToken from "@/hooks/useToken"
import { customFetch } from "@/lib/fetch"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"

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
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
  return data
}

export const getTimetableImage = async () => {
  const { data } = await customFetch('api/lesson/timetable')
  return data
}

export const useGetMessageTemplate = () => {
  const token = useToken()
  const getMessageTemplate = async () => {
    const { data } = await customFetch('api/sms/detail', token)
    return data
  }

  return useSuspenseQuery({
    queryKey: ['messageTemplate'],
    queryFn: getMessageTemplate,
  })
}

export const useUpdateMessageTemplate = () => {
  const token = useToken()
  const updateMessageTemplate = async (message: string) => {
    const { data } = await customFetch('api/sms/createTemplate', token,
      {
        method: 'POST',
        body: JSON.stringify({ text: message })
      })
    return data
  }

  return useMutation({
    mutationFn: updateMessageTemplate,
  })
}

export const useSendMessage = () => {
  const token = useToken()
  const sendMessage = async ({ lessonStudentId, phoneNumber }: { lessonStudentId: number, phoneNumber: string }) => {
    const { data } = await customFetch('api/sms/remind', token,
      {
        method: 'POST',
        body: JSON.stringify({ lessonStudentId, phoneNumber })
      })
    return data
  }

  return useMutation({
    mutationFn: sendMessage,
  })
}
