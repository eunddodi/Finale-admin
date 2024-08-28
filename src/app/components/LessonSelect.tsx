import { getLessonsByDateAndLocation } from "@/api/lesson"
import useToken from "@/hooks/useToken"
import { useSuspenseQuery } from "@tanstack/react-query"

interface LessonSelectProps {
  onSelectLesson: (lessonId: string) => void
  selectedDate: string
  selectedLocation: string
}

export default function LessonSelect({ onSelectLesson, selectedDate, selectedLocation }: LessonSelectProps) {
  const token = useToken()
  const { data: lessons } = useSuspenseQuery<{ lessonId: string, title: string, startTime: string, endTime: string }[]>({
    queryKey: ['lessons', { date: selectedDate, location: selectedLocation }],
    queryFn: () => getLessonsByDateAndLocation(selectedDate, selectedLocation, token),
  })

  return (
    <select
      disabled={!selectedDate || !selectedLocation}
      className="p-2 border rounded w-full"
      onChange={(e) => onSelectLesson(e.target.value)}
    >
      <option value="">반 선택</option>
      {lessons.map((lesson) => (
        <option key={lesson.lessonId} value={lesson.lessonId}>{lesson.title} {lesson.startTime}-{lesson.endTime}</option>
      ))}
    </select>

  )
}
