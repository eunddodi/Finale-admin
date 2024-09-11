import { AuthError, BadRequestError, ForbiddenError, NotFoundError, ServerError } from "@/types/errors"
import { API_ENDPOINT } from "@/constants"
import { redirectToLogin } from "./utils"

export async function customFetch(url: string, token?: string, options?: any) {
  try {
    const response = await fetch(`${API_ENDPOINT}/${url}`, {
      credentials: 'include',
      headers: options?.headers || {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      ...options
    })

    if (!response.ok) {
      const errorData = await response.json()
      switch (response.status) {
        case 400:
          throw new BadRequestError(errorData.data)
        case 401:
          throw new AuthError(errorData.data)
        case 403:
          throw new ForbiddenError(errorData.data)
        case 404:
          throw new NotFoundError(errorData.data)
        case 500:
          throw new ServerError(errorData.data)
        default:
          throw new Error(`HTTP error! status: ${response.status}`)
      }
    }

    return await response.json()
  }
  catch (error: any) {
    if (error instanceof AuthError || error instanceof ForbiddenError) {
      alert('로그인에 실패했습니다. 다시 로그인해주세요.')
      redirectToLogin()
      return
    }
    throw error
  }
}
