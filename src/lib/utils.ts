import { clsx, type ClassValue } from 'clsx';
import stc from 'string-to-color';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const stringToColor = (str: string) => stc(str);
