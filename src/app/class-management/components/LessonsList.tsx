import { useLessons, useUpdateLesson, useCreateLesson, useDeleteLesson } from "@/api/lesson"
import LessonBottomSheet from "./LessonBottomSheet"
import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { CreateDTO } from "@/api/lesson/types"
import { toast } from "react-toastify"
import Loader from "@/app/components/Loader"
import { Trash2 } from 'lucide-react'
import DeleteConfirmationPopup from "@/app/components/DeleteConfirmationPopup"

export default function LessonsList({ selectedYearMonth }: { selectedYearMonth: string }) {
  const { data: lessons } = useLessons({ date: selectedYearMonth })
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [selectedLessonId, setSelectedLessonId] = useState<number | undefined>(undefined)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [lessonToDelete, setLessonToDelete] = useState<number | null>(null)

  const updateMutation = useUpdateLesson()
  const createMutation = useCreateLesson()
  const deleteMutation = useDeleteLesson()

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

  const handleDeleteClick = (event: React.MouseEvent, lessonId: number) => {
    setLessonToDelete(lessonId)
    setIsDeletePopupOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (lessonToDelete) {
      try {
        await deleteMutation.mutateAsync({ lessonId: lessonToDelete })
        toast.success("레슨 삭제 성공")
      } catch (error) {
        toast.error("레슨 삭제 실패")
      }
    }
    setIsDeletePopupOpen(false)
    setLessonToDelete(null)
  }

  if (lessons.length === 0) return <div className="text-gray-500 py-2">No results</div>

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={handleAddLesson} className="w-full">레슨 추가</Button>
      {lessons.map((lesson) => (
        <div key={lesson.lessonId} className="relative">
          <button
            onClick={() => handleLessonClick(lesson.lessonId)}
            className="border w-full block bg-gray-100 p-4 rounded-lg shadow-sm font-semibold text-left pr-12"
          >
            {lesson.title} {lesson.startTime}-{lesson.endTime}
          </button>
          <button
            onClick={(e) => handleDeleteClick(e, lesson.lessonId)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-red-500"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
      <Suspense fallback={<Loader />}>
        <LessonBottomSheet
          open={isBottomSheetOpen}
          onOpenChange={setIsBottomSheetOpen}
          lessonId={selectedLessonId}
          onSave={handleSave}
        />
      </Suspense>
      <DeleteConfirmationPopup
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}