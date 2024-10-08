"use client"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import { Suspense } from "react"
import LocationSelect from "./LocationSelect"
import { Loader, Search } from "lucide-react"
import ErrorFallback from "./ErrorFallback"
import StudentsList from "./StudentsList"
import useToken from "@/hooks/useToken"
import { useQuery } from "@tanstack/react-query"
import { getPaidStudents, getUnpaidStudents } from "@/api/student"
import YearMonthSelect from "./YearMonthSelect"
import LessonSelect from "./LessonSelect"
import { StudentsProvider, useStudentsContext } from "./StudentsContext"

interface StudentsListContainerProps {
  title: string
  type: 'paid' | 'unpaid'
}

function StudentsListContainerContent({ title }: { title: string }) {
  const {
    selectedYearMonth,
    setSelectedYearMonth,
    selectedLocation,
    setSelectedLocation,
    selectedLessonId,
    setSelectedLessonId,
    searchName,
    setSearchName,
    type
  } = useStudentsContext();

  const token = useToken()
  const { data: students } = useQuery({
    queryKey: ['students', type, { yearMonth: selectedYearMonth, location: selectedLocation, lessonId: selectedLessonId }],
    queryFn: () => {
      const filter = { date: selectedYearMonth, location: selectedLocation, lessonId: selectedLessonId }
      return type === 'paid' ? getPaidStudents(filter, token) : getUnpaidStudents(filter, token)
    },
  })

  if (!students) return (<div className="flex flex-col gap-4 text-neutral-600 items-center justify-center mt-12">
    <Loader size={40} color="#82bdaa" />
    loading...
  </div>
  )

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="flex flex-wrap gap-4 mb-4">
        <YearMonthSelect
          selectedYearMonth={selectedYearMonth}
          onChange={(yearMonth: string) => {
            setSelectedYearMonth(yearMonth)
            setSelectedLessonId('')
          }}
        />
        <ErrorBoundary errorComponent={ErrorFallback}>
          <Suspense fallback={<Loader />}>
            <LocationSelect
              selectedLocation={selectedLocation}
              onChange={(location: string) => {
                setSelectedLocation(location)
                setSelectedLessonId('')
              }}
            />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary errorComponent={ErrorFallback}>
          <Suspense fallback={<Loader />}>
            <LessonSelect />
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
        {students && <StudentsList data={students} />}
      </ErrorBoundary>
    </div>
  )
}

export default function StudentsListContainer({ title, type }: StudentsListContainerProps) {
  return (
    <StudentsProvider type={type}>
      <StudentsListContainerContent title={title} />
    </StudentsProvider>
  )
}