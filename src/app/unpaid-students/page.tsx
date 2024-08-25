import dynamic from 'next/dynamic'
import Loader from '../components/Loader'

const DynamicStudentsListContainer = dynamic(() => import('../components/StudentsListContainer'), {
  ssr: false,
  loading: () => <Loader />
})

export default function UnpaidStudentsListPage() {
  return (
    <DynamicStudentsListContainer
      title="미납 학생 리스트"
      type="unpaid"
    />
  )
}
