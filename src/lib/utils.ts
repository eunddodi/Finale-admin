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

export const generateYearMonths = (): string[] => {
  const yearMonths: string[] = [];
  const today = new Date();
  const startDate = new Date(2024, 4); // 2024년 5월
  const endDate = new Date(today.getFullYear(), today.getMonth() + 2, 1);

  let currentDate = new Date(startDate);

  while (currentDate < endDate) {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    yearMonths.push(`${year}-${month}`);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return yearMonths.reverse(); // 최신 날짜가 위로 오도록 역순 정렬
};

export const generateCurrentYearMonth = (): string => {
  const yearMonths = generateYearMonths()
  return yearMonths[0]
}
