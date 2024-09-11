"use client"
import { useCopyLessons } from "@/api/lesson";
import YearMonthSelect from "@/app/components/YearMonthSelect";
import { generateCurrentYearMonth } from "@/lib/utils";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ClassCopyPage() {
  const [selectedYearMonth, setSelectedYearMonth] = useState<string>(generateCurrentYearMonth())
  const copyMutation = useCopyLessons()

  const handleCopy = () => {
    copyMutation.mutate({ dto: { lessonDate: selectedYearMonth } }, {
      onSuccess: () => {
        toast.success('복사 성공')
      },
      onError: (error) => {
        toast.error('복사 실패: ' + error.message)
      }
    })
  }

  return (
    <div className="flex flex-col items-center gap-8 pt-4">
      <div className="flex items-center gap-4">
        <YearMonthSelect
          selectedYearMonth={selectedYearMonth}
          onChange={(yearMonth) => setSelectedYearMonth(yearMonth)}
        />
        <div className="font-semibold">의 레슨을 다음달로 복사합니다.</div>
      </div>
      <button onClick={handleCopy}
        className={`w-full ${copyMutation.isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-main hover:bg-main-dark'
          } text-white font-semibold py-3 rounded-lg transition duration-300 flex justify-center items-center`}
      >복사하기</button>
    </div>
  )
}
