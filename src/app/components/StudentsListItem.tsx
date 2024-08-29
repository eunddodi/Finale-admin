import { useCancelLesson, useConfirmDeposit } from "@/api/student";
import { StudentDetail } from "@/api/student/types";
import useToken from "@/hooks/useToken";
import { format, parse } from 'date-fns';
import { useState } from "react";
import MoveLessonBottomSheet from "./MoveLessonBottomSheet";
import { useStudentsContext } from './StudentsContext';

export function StudentsListItem({ student }: { student: StudentDetail }) {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
  const cancelLessonMutation = useCancelLesson()
  const confirmDepositMutation = useConfirmDeposit()
  const { type, selectedYearMonth } = useStudentsContext();

  const token = useToken()
  const { lessonStudentId } = student
  const handleMove = () => setBottomSheetOpen(true)
  const handleCancel = () => cancelLessonMutation.mutate({ lessonStudentId, token })
  const handleConfirm = () => confirmDepositMutation.mutate({ lessonStudentId, token })

  return (
    <div key={student.lessonStudentId} className="bg-gray-100 p-4 rounded-lg shadow flex justify-between">
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="font-bold">{student.studentName}</span>
            <span className="ml-2 text-white text-sm px-2 py-1 bg-main-dark rounded-full">기존</span>
            {/* TODO: 기존 여부 플래그 */}
          </div>
        </div>
        <div className="text-gray-700 break-all">{student.phoneNumber}</div>
        <div className="text-gray-500 text-xs">
          {format(new Date(student.enrollmentDate), 'M/d h:mm a')}
        </div>
        <div className="text-xs text-gray-600 mt-1">{student.lessonTitle}</div>
        <div className="text-xs text-gray-600">
          {format(parse(student.startTime, 'HH:mm', new Date()), 'h:mm')} -
          {format(parse(student.endTime, 'HH:mm', new Date()), 'h:mm')}
        </div>
      </div>
      <div>
        <div className="mt-4 flex space-x-2">
          <button onClick={handleCancel} className="bg-red-100 text-red-500 text-sm px-3 font-semibold py-2 rounded-lg">
            등록 취소
          </button>
          <button onClick={type === 'paid' ? handleMove : handleConfirm} className="bg-blue-100 text-blue-500 text-sm px-3 font-semibold py-2 rounded-lg">
            {type === 'paid' ? '반 이동' : '입금 확인'}
          </button>
        </div>
        <div className="mt-2">
          <button className="bg-gray-300 text-gray-600 text-sm px-3 font-semibold py-2 rounded-lg w-full">
            {type === 'paid' ? '전화번호 복사' : '독촉 문자 발송'}
          </button>
        </div>
      </div>
      <MoveLessonBottomSheet open={bottomSheetOpen} onOpenChange={setBottomSheetOpen} currentDate={selectedYearMonth} targetStudent={student} />
    </div>
  )
}