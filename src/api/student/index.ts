import { customFetch } from "@/lib/fetch"
import { StudentDetail } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FilterDTO {
  date?: string
  location?: string
}

export const getPaidStudents = async (dto: FilterDTO, token: string): Promise<StudentDetail[]> => {
  const url = `api/deposit/trueList?date=${dto.date || ''}&location=${dto.location || ''}`;
  const { data } = await customFetch(url, token, {
    method: 'GET'
  })
  return data
}

export const getUnpaidStudents = async (dto: FilterDTO, token: string): Promise<StudentDetail[]> => {
  const url = `api/deposit/falseList?date=${dto.date || ''}&location=${dto.location || ''}`;
  const { data } = await customFetch(url, token, {
    method: 'GET'
  })
  return data
}

export const useCancelLesson = () => {
  const cancelLesson = async ({ lessonStudentId, token }: { lessonStudentId: number, token: string }): Promise<void> => {
    const { data } = await customFetch(`api/coach/lessonCencel/${lessonStudentId}`, token)
    return data
  }

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cancelLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    }
  })
}

export const useConfirmDeposit = () => {
  const confirmDeposit = async ({ lessonStudentId, token }: { lessonStudentId: number, token: string }): Promise<void> => {
    const { data } = await customFetch(`api/coach/depositConfirm/${lessonStudentId}`, token)
    return data
  }

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: confirmDeposit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    }
  })
}
interface MoveLessonDTO {
  lessonStudentId: number
  lessonId: number // 옮기려는 반 아이디
  studentId: number // 학생 아이디
}

export const useMoveLesson = () => {
  const moveLesson = async ({ dto, token }: { dto: MoveLessonDTO, token: string }): Promise<void> => {
    const { data } = await customFetch(`api/coach/moveLesson`, token, {
      method: 'POST',
      body: JSON.stringify(dto)
    })
    return data
  }

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: moveLesson, onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    }
  })
}

// 문자 발송
