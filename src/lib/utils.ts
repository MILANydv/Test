import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'NPR'): string {
  return new Intl.NumberFormat('ne-NP', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date | string, locale: string = 'en-US'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

export function formatDateTime(date: Date | string, locale: string = 'en-US'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}

export function generateReferralCode(length: number = 8): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function calculateCommission(
  type: 'FLAT' | 'PERCENTAGE' | 'TIERED',
  value: number,
  amount?: number,
  tiers?: { min: number; max: number; value: number }[]
): number {
  if (type === 'FLAT') {
    return value;
  }

  if (type === 'PERCENTAGE' && amount) {
    return (amount * value) / 100;
  }

  if (type === 'TIERED' && amount && tiers) {
    for (const tier of tiers) {
      if (amount >= tier.min && (!tier.max || amount <= tier.max)) {
        return (amount * tier.value) / 100;
      }
    }
  }

  return 0;
}
