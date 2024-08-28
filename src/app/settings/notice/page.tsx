'use client'
import React, { useState, Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ErrorFallback from '@/app/components/ErrorFallback'
import NoticeForm from './components/NoticeForm'
import TimetableImage from './components/TimetableImage'
import { updateNotice, uploadTimetableImage } from '@/api/notice'
import useToken from '@/hooks/useToken'

const NoticePage: React.FC = () => {
  const [notice, setNotice] = useState('')
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    console.log('file', file)
  }, [file])

  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()
  const token = useToken()
  const updateNoticeMutation = useMutation({
    mutationFn: (newNotice: string) => updateNotice(newNotice, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notice'] })
      toast.success('공지사항 저장 성공')
    },
    onError: () => {
      toast.error('공지사항 저장 실패')
    }
  })

  const uploadImageMutation = useMutation({
    mutationFn: (file: File) => uploadTimetableImage(file, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timetableImage'] })
      toast.success('이미지 업로드 성공')
    },
    onError: () => {
      toast.error('이미지 업로드 실패')
    }
  })

  const handleSave = async () => {
    setIsLoading(true)
    console.log('notice', notice)
    try {
      await updateNoticeMutation.mutateAsync(notice)
      if (file) {
        await uploadImageMutation.mutateAsync(file)
      }
      toast.success('변경사항 저장 완료')
    } catch (error) {
      console.error('Error saving changes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold ">공지사항 수정하기</h1>
          <div className="border-l-4 border-main-dark text-sm text-gray-500 pl-2 my-4" role="alert">
            <p>{`'저장하기' 버튼을 클릭해야 텍스트와 이미지가 모두 저장됩니다.`}</p>
          </div>
        </div>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<div>Loading...</div>}>
            <NoticeForm onChange={setNotice} notice={notice} />
            <TimetableImage onFileSelect={setFile} />
            <button
              onClick={handleSave}
              disabled={isLoading}
              className={`w-full ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-main hover:bg-main-dark'
                } text-white py-3 rounded-lg transition duration-300 flex justify-center items-center`}
            >
              {isLoading ? (
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
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default NoticePage