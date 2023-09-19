import { mapObjectPropsToSnakeCase } from '../utils/supabase-object.util';
import { SupabaseConverterOptions } from './supabase-converter-options';

interface SupabasePayloadOptions {
  fromObject: any;
  converterOptions?: SupabaseConverterOptions;
  // skipUndefined,
  // setNullWhenUndefined
}

export class SupabasePayloadBuilder {
  constructor(private options: SupabasePayloadOptions = {} as SupabasePayloadOptions) {}

  getPayload(): any {
    return mapObjectPropsToSnakeCase(this.options.fromObject, this.options?.converterOptions);
  }
}
