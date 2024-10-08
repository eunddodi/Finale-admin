'use client'

import useLocalStorage, { LOCAL_STORAGE_KEYS } from '@/hooks/useLocalStorage'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef } from 'react'
import { customFetch } from '@/lib/fetch'
import Loader from '@/app/components/Loader'

type AuthResponse = {
  userInfo: {
    name: string
    phoneNumber: string
  },
  token: string
}

async function sendAuthInformation(code: string, state: 'student' | 'coach'): Promise<AuthResponse> {
  const res = await customFetch(`login/callback?code=${code}&state=${state}`)
  return res.data;
}

export default function LoginCallbackPage() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  )
}


function Login() {
  const params = useSearchParams()

  const setToken = useLocalStorage(LOCAL_STORAGE_KEYS.TOKEN)[1]
  const redirectTo = useLocalStorage(LOCAL_STORAGE_KEYS.REDIRECT_TO)[0]

  const isCallbackExecuted = useRef(false)

  useEffect(() => {
    const authorizeAndRedirect = async () => {

      if (isCallbackExecuted.current) return

      try {
        const code = params.get('code')
        const state = params.get('state')

        if (!code || !state || (state !== 'student' && state !== 'coach')) throw new Error('Invalid code or state')

        isCallbackExecuted.current = true
        const { token, userInfo } = await sendAuthInformation(code, state)

        if (!token || !userInfo) throw new Error('Invalid token or userInfo')

        setToken(token)
        window.location.href = redirectTo || '/'

      } catch (e) {
        window.location.href = '/'
      }
    }

    authorizeAndRedirect()

  }, [params])

  return <Loader />
}