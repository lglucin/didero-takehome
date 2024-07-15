import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const SIDEBAR_WIDTH = 216;
export const HEADER_HEIGHT = 56;

/**
 *
 * @param inputs - tailwind classes
 * @returns Merged tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gray colors
 */
export const gray = {
  50: '#F6F8F9',
  100: '#EBEEF1',
  200: '#D3D7DB',
  300: '#B4B7BB',
  400: '#919499',
  500: '#72767C',
  600: '#5A6066',
  700: '#454A4F',
  800: '#34383C',
  900: '#26292D',
  950: '#121417',
};
