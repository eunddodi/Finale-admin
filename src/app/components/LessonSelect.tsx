import { useLessons } from "@/api/lesson"
import useToken from "@/hooks/useToken"
import { useStudentsContext } from './StudentsContext'

export default function LessonSelect() {
  const token = useToken()
  const { selectedYearMonth, selectedLocation, selectedLessonId, setSelectedLessonId } = useStudentsContext()
  const { data: lessons } = useLessons({ date: selectedYearMonth, location: selectedLocation, token });

  return (
    <select
      disabled={!selectedYearMonth || !selectedLocation}
      className="p-2 border rounded w-full"
      value={selectedLessonId}
      onChange={(e) => setSelectedLessonId(e.target.value)}
    >
      <option value="">반 선택</option>
      {lessons?.map((lesson) => (
        <option key={lesson.lessonId} value={lesson.lessonId}>{lesson.title} {lesson.startTime}-{lesson.endTime}</option>
      ))}
    </select>
  )
}