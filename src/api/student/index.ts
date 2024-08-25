import { customFetch } from "@/lib/fetch"
import { Student } from "./types";

interface FilterDTO {
  date?: string
  location?: string
}

export const getPaidStudents = async (dto: FilterDTO, token: string): Promise<Student[]> => {
  const url = `api/deposit/trueList?date=${dto.date || ''}&location=${dto.location || ''}`;
  const { data } = await customFetch(url, token, {
    method: 'GET'
  })
  return data
}

export const getUnpaidStudents = async (dto: FilterDTO, token: string): Promise<Student[]> => {
  const url = `api/deposit/falseList?date=${dto.date || ''}&location=${dto.location || ''}`;
  const { data } = await customFetch(url, token, {
    method: 'GET'
  })
  return data
}

// 등록 취소
// 입금 확인
// 문자 발송
// 반 이동시키기