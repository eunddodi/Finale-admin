import { useGetMessageTemplate, useUpdateMessageTemplate } from "@/api/notice"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const MessageTemplateForm: React.FC = () => {
  const query = useGetMessageTemplate()
  const [text, setText] = useState('')
  useEffect(() => setText(query.data), [query.data])

  const mutation = useUpdateMessageTemplate()
  const handleSave = () => {
    mutation.mutate(text, {
      onSuccess: () => toast.success('수정 성공')
    })
  }

  return (
    <>
      <div className="mb-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border-none bg-transparent resize-none h-96"
            rows={8}
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        disabled={mutation.isPending}
        className={`w-full ${mutation.isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-main hover:bg-main-dark'
          } text-white py-3 rounded-lg transition duration-300 flex justify-center items-center`}
      >
        {mutation.isPending ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            저장 중...
          </>
        ) : (
          '수정하기'
        )}
      </button>
    </>
  )
}

export default MessageTemplateForm
