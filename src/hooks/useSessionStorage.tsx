import { useSessionStorage as useSessionStorageOrigin } from "usehooks-ts";

export const SESSION_STORAGE_KEYS = {
  TOKEN: 'token',
  REDIRECT_TO: 'redirectTo',
}

type TKey = typeof SESSION_STORAGE_KEYS[keyof typeof SESSION_STORAGE_KEYS]

export default function useSessionStorage(key: TKey) {
  return useSessionStorageOrigin(key, '')
}
