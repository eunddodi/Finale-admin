import { generateYearMonths } from '@/lib/utils';
import { useStudentsContext } from './StudentsContext'

export default function YearMonthSelect() {
  const { selectedYearMonth, setSelectedYearMonth } = useStudentsContext()

  return (
    <select
      className="p-2 border rounded"
      value={selectedYearMonth}
      onChange={(e) => setSelectedYearMonth(e.target.value)}
    >
      {yearMonths.map((yearMonth) => (
        <option key={yearMonth} value={yearMonth}>{yearMonth}</option>
      ))}
    </select>
  )
}


const yearMonths = generateYearMonths()
