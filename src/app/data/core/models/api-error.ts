import { SupabaseAuthError, SupabaseError } from '../providers/remote/supabase';

export type ApiError = SupabaseError;

export type AuthError = SupabaseAuthError;
