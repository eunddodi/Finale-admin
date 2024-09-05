export interface ILesson {
  lessonId: number
  title: string
  locationName: string
  coaches: number[]
  days: number
  lessonDates: LessonDate[]
  cost: string
  studentsPerCoach: number
}

export interface LessonDate {
  date: string
  startTime: string
  endTime: string
}

export interface CreateDTO extends ILesson {
  classSize: number
}

export interface UpdateDTO extends Partial<ILesson> { }

export interface CopyDTO {
  lessonDate: string
}
