import { getPaidStudents, getUnpaidStudents } from "@/api/student"
import useToken from "@/hooks/useToken"
import { useSuspenseQuery } from "@tanstack/react-query"
import { StudentsListItem } from "./StudentsListItem"

interface StudentsListProps {
  yearMonth: string
  location: string
  searchName: string
  type: 'paid' | 'unpaid'
}

export default function StudentsList({ yearMonth, location, searchName, type }: StudentsListProps) {

  const token = useToken()
  const { data: students } = useSuspenseQuery({
    queryKey: ['students', type, yearMonth, location],
    queryFn: () => {
      const filter = { date: yearMonth, location: location }
      return type === 'paid' ? getPaidStudents(filter, token) : getUnpaidStudents(filter, token)
    },
  })

  const filteredStudents = students?.filter(student =>
    !searchName || student.studentName.includes(searchName)
  ) ?? []

  return (
    <ul className="space-y-2">
      {filteredStudents.map(student => (
        <StudentsListItem key={student.studentId} student={student} />
      ))}
    </ul>
  )
}
