import React from 'react'
import StudentsListContainer from '../components/StudentsListContainer'

export default function PaidStudentsListPage() {
  return (
    <StudentsListContainer
      title="입금 완료 학생 리스트"
      type="unpaid"
    />
  )
}
