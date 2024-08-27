"use client"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import { Suspense, useState } from "react"
import LocationSelect from "./LocationSelect"
import { Search } from "lucide-react"
import ErrorFallback from "./ErrorFallback"
import StudentsList from "./StudentsList"

interface StudentsListContainerProps {
  title: string
  type: 'paid' | 'unpaid'
}

export default function StudentsListContainer({ title, type }: StudentsListContainerProps) {
  const [selectedYearMonth, setSelectedYearMonth] = useState<string>('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [searchName, setSearchName] = useState<string>('')

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="p-2 border rounded"
          value={selectedYearMonth}
          onChange={(e) => setSelectedYearMonth(e.target.value)}
        >
          <option value="">년월 선택</option>
          {yearMonths.map((yearMonth) => (
            <option key={yearMonth} value={yearMonth}>{yearMonth}</option>
          ))}
        </select>

        <ErrorBoundary errorComponent={ErrorFallback}>
          <Suspense fallback={<div>반 목록 로딩 중...</div>}>
            <LocationSelect onSelectLocation={setSelectedLocation} />
          </Suspense>
        </ErrorBoundary>

        <div className="relative">
          <input
            type="text"
            placeholder="이름 검색"
            className="p-2 pl-8 border rounded"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <ErrorBoundary errorComponent={ErrorFallback}>
        <Suspense fallback={<div>학생 목록 로딩 중...</div>}>
          <StudentsList
            yearMonth={selectedYearMonth}
            location={selectedLocation}
            searchName={searchName}
            type={type}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

const generateYearMonths = (): string[] => {
  const yearMonths: string[] = [];
  const today = new Date();
  const startDate = new Date(2024, 4); // 2024년 5월
  const endDate = new Date(today.getFullYear(), today.getMonth() + 2, 1);

  let currentDate = new Date(startDate);

  while (currentDate < endDate) {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    yearMonths.push(`${year}-${month}`);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return yearMonths.reverse(); // 최신 날짜가 위로 오도록 역순 정렬
};

const yearMonths = generateYearMonths();