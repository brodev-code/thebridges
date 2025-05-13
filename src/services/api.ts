import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'https://thebridges.duckdns.org/';
export const API_BASE_URL = 'https://thebridges.duckdns.org/api';
export const FILE_STORAGE_URL = 'https://thebridges.duckdns.org/storage/app/public/';


export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token'ı her isteğe eklemek için interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24 saat formatı için
  }).format(new Date(dateString));
};

export const formatBirthday = (dateString: string) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(dateString));
};

export const formatDateOnly = (dateString: string) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(dateString));
};

/**
 * dateString ya ISO datetime (örn. "2025-04-11T14:30:00Z")
 * ya da sadece "HH:mm:ss" formatında olabilir.
 */
export const formatTime = (dateString: string): string => {
  // eğer içinde "T" varsa ISO datetime kabul edip Date ile parse et
  if (dateString.includes('T')) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      hour:   '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  }

  // yoksa "HH:mm:ss" split edip direkt "HH:mm" döndür
  const [hh, mm] = dateString.split(':');
  // guard: eğer parse edilemezse orijinali dön
  if (!hh || !mm) return dateString;
  return `${hh.padStart(2, '0')}:${mm.padStart(2, '0')}`;
};