
'use client'
import { Suspense, useState } from "react";
import LessonsList from "./components/LessonsList";
import { generateCurrentYearMonth } from "@/lib/utils";
import YearMonthSelect from "../components/YearMonthSelect";

export default function Page() {
  const [selectedYearMonth, setSelectedYearMonth] = useState<string>(generateCurrentYearMonth())

  return (
    <div className="container mx-auto p-2">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">분반 목록</h1>
        <YearMonthSelect
          selectedYearMonth={selectedYearMonth}
          onChange={setSelectedYearMonth}
        />
      </div>
      <Suspense>
        <LessonsList selectedYearMonth={selectedYearMonth} />
      </Suspense>
    </div>
  )
}
