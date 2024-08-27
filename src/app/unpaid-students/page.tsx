import dynamic from 'next/dynamic'
import Loader from '../components/Loader'

const DynamicStudentsListContainer = dynamic(() => import('../components/StudentsListContainer'), {
  ssr: false,
  loading: () => <Loader />
})

export default function UnpaidStudentsListPage() {
  return (
    <DynamicStudentsListContainer
      title="미입금 수강생 목록"
      type="unpaid"
    />
  )
}
