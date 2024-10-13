import useSessionStorage, { SESSION_STORAGE_KEYS } from "./useSessionStorage";

export default function useToken() {
  const [token] = useSessionStorage(SESSION_STORAGE_KEYS.TOKEN);
  return token;
}
