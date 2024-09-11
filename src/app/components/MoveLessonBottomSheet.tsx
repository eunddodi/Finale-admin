import { useLessons } from '@/api/lesson'
import useToken from '@/hooks/useToken'
import Loader from './Loader'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ErrorFallback'
import { Suspense, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerDescription, DrawerFooter, DrawerTitle } from '@/components/ui/drawer'
import { StudentDetail } from '@/api/student/types'
import { useMoveLesson } from '@/api/student'
import { toast } from 'react-toastify'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentDate: string
  targetStudent: StudentDetail
}

export default function MoveLessonBottomSheet({ open, onOpenChange, currentDate, targetStudent }: Props) {
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null)
  const moveLessonMutation = useMoveLesson()
  const token = useToken()

  const handleSave = () => {
    if (!selectedLessonId) return

    moveLessonMutation.mutate({ dto: { lessonStudentId: targetStudent.lessonStudentId, lessonId: selectedLessonId, studentId: targetStudent.studentId }, token }, {
      onSuccess: () => toast.success('반 이동 성공'),
      onError: () => toast.error('반 이동 실패'),
    })
    onOpenChange(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedLessonId(null)
    }
    onOpenChange(open)
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} handleOnly>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>반 이동</DrawerTitle>
          <DrawerDescription>{targetStudent.studentName} {targetStudent.lessonTitle} {targetStudent.startTime}-{targetStudent.endTime}</DrawerDescription>
        </DrawerHeader>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loader />}>
            <Content
              selectedLessonId={selectedLessonId}
              onSelect={setSelectedLessonId}
              date={currentDate}
            />
          </Suspense>
          <DrawerFooter className="absolute bottom-0 p-0 w-full bg-white">
            <Button onClick={handleSave} disabled={!selectedLessonId} className="rounded-none py-8">저장</Button>
          </DrawerFooter>
        </ErrorBoundary>
      </DrawerContent>
    </Drawer>
  )
}

const Content = ({
  date,
  selectedLessonId,
  onSelect,
}: {
  date: string
  selectedLessonId: number | null
  onSelect: (lessonId: number) => void
}) => {
  const { data: lessons } = useLessons({ date })

  return (
    <div className="p-4 overflow-y-auto pb-32">
      {lessons.map((lesson) => (
        <div
          key={lesson.lessonId}
          onClick={() => onSelect(lesson.lessonId)}
          className={`${selectedLessonId === lesson.lessonId ? 'bg-blue-200' : 'bg-white'
            } p-2 cursor-pointer`}
        >
          {lesson.title} {lesson.startTime}-{lesson.endTime}
        </div>
      ))}
    </div>
  )
}