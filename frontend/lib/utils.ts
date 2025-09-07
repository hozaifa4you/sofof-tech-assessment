import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const formatDateForInput = (date: Date | string): string => {
   const dateValue = typeof date === "string" ? new Date(date) : date;
   return dateValue.toISOString().slice(0, 16);
};
