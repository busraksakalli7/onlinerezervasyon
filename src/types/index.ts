// Kullanıcı tipleri
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
  status: 'active' | 'inactive';
}

// Kaynak tipleri
export interface Resource {
  id: string;
  name: string;
  type: 'vehicle' | 'room' | 'hall';
  capacity: number;
  status: 'available' | 'reserved' | 'maintenance';
  description?: string;
  features?: string[];
}

// Rezervasyon tipleri
export interface Reservation {
  id: string;
  resourceId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  purpose: string;
  participantCount?: number;
  notes?: string;
}

// Log tipleri
export interface SystemLog {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  action: string;
  userId?: string;
  details: string;
  module: 'user' | 'resource' | 'reservation' | 'system';
}

// Tablo filtreleri için ortak tip
export interface TableFilters {
  search: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  type?: string;
}

// API Yanıt tipleri
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination tipi
export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
} 