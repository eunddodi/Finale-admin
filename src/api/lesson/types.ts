export interface ILesson {
  id: number;
  locationName: string;
  cost: string;
  day: number;
  maxStudents: number;
  currentEnrollment: number;
  studentsPerCoach: number;
  coaches: string[];
  lessonDates: LessonDate[];
  students: Student[];
}

interface Student {
  id: number;
  studentId: number;
  name: string;
  phoneNumber: string;
  deposit: boolean;
}

interface LessonDate {
  date: string;
  startTime: string;
  endTime: string;
}


export interface CreateDTO extends Pick<ILesson, 'locationName' | 'cost' | 'maxStudents' | 'lessonDates'> {
  days: number
}

export interface UpdateDTO extends Partial<CreateDTO> { }

export interface CopyDTO {
  lessonDate: string
}
