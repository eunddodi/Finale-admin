import { StudentsListItem } from "./StudentsListItem"
import { StudentDetail } from "@/api/student/types"
import { useStudentsContext } from './StudentsContext'

interface StudentsListProps {
  data: StudentDetail[]
}

export default function StudentsList({ data }: StudentsListProps) {
  const { searchName } = useStudentsContext()

  if (data.length === 0) return <div className="text-gray-500 py-2">No results</div>
  return (
    <ul className="space-y-2">
      {data.filter((student: StudentDetail) => !searchName || student.studentName.includes(searchName)).map(student => (
        <StudentsListItem key={student.lessonStudentId} student={student} />
      ))}
    </ul>
  )
}