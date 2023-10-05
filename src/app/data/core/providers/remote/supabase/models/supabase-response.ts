import { SupabaseAuthError, SupabaseError } from './supabase-error';

export interface SupabaseAuthResponse<T> {
  data?: T;
  error?: SupabaseAuthError;
}

export interface SupabaseResponse<T> {
  data: T;
  error?: SupabaseError;
  count?: number;
  status: number;
  statusText: string;
}
