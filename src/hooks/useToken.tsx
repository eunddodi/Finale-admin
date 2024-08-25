import useLocalStorage, { LOCAL_STORAGE_KEYS } from "./useLocalStorage";

export default function useToken() {
  const [token] = useLocalStorage(LOCAL_STORAGE_KEYS.TOKEN);
  return token;
}
