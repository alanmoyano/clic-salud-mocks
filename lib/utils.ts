import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCuil(cuil: string) {
  return `${cuil.slice(0, 2)}-${cuil.slice(2, 10)}-${cuil.slice(10, 14)}`;
}

export function capitalize(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}
