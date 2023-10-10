import { SupabaseAuthError, SupabaseError } from '../providers/supabase';

export type ApiError = SupabaseError;

export type AuthError = SupabaseAuthError;
