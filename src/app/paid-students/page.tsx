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
      title="입금 완료 수강생 목록"
      type="paid"
    />
  )
}
