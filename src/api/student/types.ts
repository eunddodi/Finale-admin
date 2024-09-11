import { QueryFunction } from "@tanstack/react-query"

export interface Student {
  id: string
  name: string
  location: string
  date: string
}

export type StudentQueryFunction = QueryFunction<Student[], [string, string | undefined, string | undefined]>

export interface StudentDetail {
  lessonStudentId: number
  studentId: number
  lessonTitle: string
  startTime: string
  endTime: string
  studentName: string
  phoneNumber: string
  enrollmentDate: string
  newbie: boolean
}
