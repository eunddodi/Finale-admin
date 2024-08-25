import React from 'react'
import dynamic from 'next/dynamic'
import { Loader } from 'lucide-react'

const DynamicStudentsListContainer = dynamic(() => import('../components/StudentsListContainer'), {
  ssr: false,
  loading: () => <Loader />
})


export default function PaidStudentsListPage() {
  return (
    <DynamicStudentsListContainer
      title="입금 완료 학생 리스트"
      type="unpaid"
    />
  )
}
