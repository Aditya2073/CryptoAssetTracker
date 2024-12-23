import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

const API_URL = 'https://api.coincap.io/v2';

export async function fetchTopAssets(search?: string) {
  const searchParam = search ? `&search=${search}` : '';
  const response = await fetch(`${API_URL}/assets?limit=2000${searchParam}`);
  if (!response.ok) throw new Error('Failed to fetch assets');
  return response.json();
}

export async function fetchAssetHistory(id: string) {
  const response = await fetch(`${API_URL}/assets/${id}/history?interval=d1`);
  if (!response.ok) throw new Error('Failed to fetch asset history');
  return response.json();
}

export async function fetchAssetDetails(id: string) {
  const response = await fetch(`${API_URL}/assets/${id}`);
  if (!response.ok) throw new Error('Failed to fetch asset details');
  return response.json();
}