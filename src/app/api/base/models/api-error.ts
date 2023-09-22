import { SupabaseAuthError, SupabaseError } from 'src/app/core/supabase/models/supabase-error';

export type ApiError = SupabaseError;

export type AuthError = SupabaseAuthError;
