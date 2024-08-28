"use client"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import { Suspense, useState } from "react"
import LocationSelect from "./LocationSelect"
import { Search } from "lucide-react"
import ErrorFallback from "./ErrorFallback"
import StudentsList from "./StudentsList"
import useToken from "@/hooks/useToken"
import { useQuery } from "@tanstack/react-query"
import { getPaidStudents, getUnpaidStudents } from "@/api/student"
import Loader from "./Loader"
import YearMonthSelect from "./YearMonthSelect"

interface StudentsListContainerProps {
  title: string
  type: 'paid' | 'unpaid'
}

export default function StudentsListContainer({ title, type }: StudentsListContainerProps) {
  const [selectedYearMonth, setSelectedYearMonth] = useState<string>('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [searchName, setSearchName] = useState<string>('')

  const token = useToken()
  const { data: students } = useQuery({
    queryKey: ['students', type, { yearMonth: selectedYearMonth, location: selectedLocation }],
    queryFn: () => {
      const filter = { date: selectedYearMonth, location: selectedLocation }
      return type === 'paid' ? getPaidStudents(filter, token) : getUnpaidStudents(filter, token)
    },
  })

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="flex flex-wrap gap-4 mb-4">
        <YearMonthSelect selectedYearMonth={selectedYearMonth} onSelectYearMonth={setSelectedYearMonth} />
        <ErrorBoundary errorComponent={ErrorFallback}>
          <Suspense fallback={<Loader />}>
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
        {students && <StudentsList
          searchName={searchName}
          data={students}
          type={type}
        />}
      </ErrorBoundary>
    </div>
  )
}

