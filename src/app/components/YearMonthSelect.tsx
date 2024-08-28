interface YearMonthSelectProps {
  selectedYearMonth: string
  onSelectYearMonth: (yearMonth: string) => void
}

export default function YearMonthSelect({ selectedYearMonth, onSelectYearMonth }: YearMonthSelectProps) {
  return (
    <select
      className="p-2 border rounded"
      value={selectedYearMonth}
      onChange={(e) => onSelectYearMonth(e.target.value)}
    >
      <option value="">년월 선택</option>
      {yearMonths.map((yearMonth) => (
        <option key={yearMonth} value={yearMonth}>{yearMonth}</option>
      ))}
    </select>

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