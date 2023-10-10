import { SupabaseConverterOptions } from './supabase-converter-options';

// TODO What other options we can add
export interface SupabasePayloadOptions {
  converterOptions?: SupabaseConverterOptions;
  // skipUndefined,
  // setNullWhenUndefined
}
