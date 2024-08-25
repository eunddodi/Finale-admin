import { getNotice } from "@/api/notice"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useEffect } from "react"

const NoticeForm: React.FC<{ notice: string, onChange: (notice: string) => void }> = ({ notice, onChange }) => {
  const { data: noticeData } = useSuspenseQuery({ queryKey: ['notice'], queryFn: getNotice })

  useEffect(() => {
    if (noticeData) {
      onChange(noticeData)
    }
  }, [noticeData, onChange])

  return (
    <div className="mb-4">
      <label htmlFor="image" className="block mb-2 font-semibold">공지사항</label>
      <div className="bg-gray-100 p-4 rounded-lg">
        <textarea
          value={notice}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border-none bg-transparent resize-none"
          rows={8}
        />
      </div>
    </div>
  )
}

export default NoticeForm
