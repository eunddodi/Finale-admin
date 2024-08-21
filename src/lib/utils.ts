import { LOCAL_STORAGE_KEYS } from "@/hooks/useLocalStorage";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function redirectToLogin() {
  window.location.href = '/login';
  localStorage.setItem(LOCAL_STORAGE_KEYS.REDIRECT_TO, JSON.stringify(window.location.pathname));
}
