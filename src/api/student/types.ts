import { QueryFunction } from "@tanstack/react-query"

export interface Student {
  id: string
  name: string
  location: string
  date: string
}

export type StudentQueryFunction = QueryFunction<Student[], [string, string | undefined, string | undefined]>
