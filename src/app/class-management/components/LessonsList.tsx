import { useLessons, useUpdateLesson, useCreateLesson } from "@/api/lesson"
import LessonBottomSheet from "./LessonBottomSheet"
import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { CreateDTO } from "@/api/lesson/types"
import { toast } from "react-toastify"
import Loader from "@/app/components/Loader"

export default function LessonsList({ selectedYearMonth }: { selectedYearMonth: string }) {
  const { data: lessons } = useLessons({ date: selectedYearMonth })
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [selectedLessonId, setSelectedLessonId] = useState<number | undefined>(undefined)

  const updateMutation = useUpdateLesson()
  const createMutation = useCreateLesson()

  const handleLessonClick = (lessonId: number) => {
    setSelectedLessonId(lessonId)
    setIsBottomSheetOpen(true)
  }

  const handleAddLesson = () => {
    setSelectedLessonId(undefined)
    setIsBottomSheetOpen(true)
  }

  const handleSave = async (lessonData: CreateDTO) => {
    try {
      if (selectedLessonId) {
        await updateMutation.mutateAsync({ dto: { ...lessonData, lessonId: selectedLessonId } })
        toast.success("레슨 업데이트 성공")
      } else {
        await createMutation.mutateAsync({ dto: lessonData })
        toast.success("새 레슨 생성 성공")
      }
      setIsBottomSheetOpen(false)
    } catch (error) {
      toast.error("레슨 저장 실패")
    }
  }

  if (lessons.length === 0) return <div className="text-gray-500 py-2">No results</div>

  return (
    <div className="flex flex-col gap-4">
      {lessons.map((lesson) => (
        <button
          onClick={() => handleLessonClick(lesson.lessonId)}
          key={lesson.lessonId}
          className="border w-full block bg-gray-100 p-4 rounded-lg shadow-sm font-semibold text-left"
        >
          {lesson.title} {lesson.startTime}-{lesson.endTime}
        </button>
      ))}
      <Suspense fallback={<Loader />}>
        <LessonBottomSheet
          open={isBottomSheetOpen}
          onOpenChange={setIsBottomSheetOpen}
          lessonId={selectedLessonId}
          onSave={handleSave}
        />
      </Suspense>
      <Button onClick={handleAddLesson} className="w-full">레슨 추가</Button>
    </div>
  )
}
