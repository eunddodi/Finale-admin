'use client'
import useToken from '@/hooks/useToken'
import { redirectToLogin } from '@/lib/utils'

export default function Home() {
  const token = useToken()
  if (!token) {
    redirectToLogin()
  } else {
    window.location.href = '/unpaid-students'
  }
}
