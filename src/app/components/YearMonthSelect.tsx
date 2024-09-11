import { generateYearMonths } from '@/lib/utils';

interface Props {
  selectedYearMonth: string
  onChange: (yearMonth: string) => void
}

export default function YearMonthSelect({ selectedYearMonth, onChange }: Props) {

  return (
    <select
      className="p-2 border rounded"
      value={selectedYearMonth}
      onChange={(e) => onChange(e.target.value)}
    >
      {
        yearMonths.map((yearMonth) => (
          <option key={yearMonth} value={yearMonth}>{yearMonth}</option>
        ))
      }
    </select >
  )
}


const yearMonths = generateYearMonths()
