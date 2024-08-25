import React from 'react'
import StudentsListContainer from '../components/StudentsListContainer'

export default function UnpaidStudentsListPage() {
  return (
    <StudentsListContainer
      title="미납 학생 리스트"
      type="unpaid"
    />
  )
}
