import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const settings = [
  { label: '분반 전체 복사', href: '/settings/class-copy' },
  { label: '공지사항 수정', href: '/settings/notice' },
  { label: '수업 장소 관리', href: '/settings/location' },
  { label: '문자 내용 수정', href: '/settings/message' },
]
export default function Page() {
  return (
    <ul>
      {settings.map(({ label, href }) => (
        <li key={label}>
          <Link href={href} className="flex justify-between py-4 px-2 font-semibold">
            {label}
            <ChevronRight />
          </Link>
        </li>
      ))}
    </ul>
  )
}
