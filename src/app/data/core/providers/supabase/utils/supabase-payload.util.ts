import { SupabasePayloadOptions } from '../models/supabase-payload';
import { mapObjectPropsToSnakeCase } from './supabase-object.util';

export const supabasePayload = <T extends object, R extends object>(model: T, options?: SupabasePayloadOptions): R =>
  mapObjectPropsToSnakeCase(model, options?.converterOptions);
