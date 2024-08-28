import { customFetch } from "@/lib/fetch"
import { StudentDetail } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
    const { data } = await customFetch(`api/coach/lessonCancel/${lessonStudentId}`, token, {
      method: 'POST'
    })
    return data
  }

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cancelLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success('취소 완료')
    },
    onError: () => {
      toast.error('취소 실패')
    }
  })
}

export const useConfirmDeposit = () => {
  const confirmDeposit = async ({ lessonStudentId, token }: { lessonStudentId: number, token: string }): Promise<void> => {
    const { data } = await customFetch(`api/coach/depositConfirm/${lessonStudentId}`, token, {
      method: 'POST'
    })
    return data
  }

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: confirmDeposit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success('입금 확인 완료')
    },
    onError: () => {
      toast.error('입금 확인 실패')
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
