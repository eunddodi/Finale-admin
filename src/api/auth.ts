import { customFetch } from "@/lib/fetch"
import { redirect } from "next/navigation"

export const login = async () => {
  const { data } = await customFetch(`login/coach`)
  redirect(data)
}
