import { Observable, from, map, tap } from 'rxjs';
import { mapObjectPropsToCamelCase } from '../utils/supabase-object.util';
import { SupabaseConverterOptions } from '../models/supabase-converter-options';
import { SupabaseResponse } from '../models/supabase-response';

// TODO Write tests

interface SupabaseObject<T> extends PromiseLike<T> {
  throwOnError(): this;
}

const mapSupabaseResponse = <T extends object, R>(
  response: SupabaseResponse<T>,
  converterOptions: SupabaseConverterOptions
): R => {
  const { count, data } = response;
  const mappedResponse = mapObjectPropsToCamelCase(data, converterOptions) as R;

  return Array.isArray(mappedResponse)
    ? ({
        totalItems: count, // to get total items we need set count flag in select method
        items: mappedResponse
      } as R)
    : mappedResponse;
};

export function fromSupabase<T extends object, R>(
  input: SupabaseObject<SupabaseResponse<T>>,
  options?: { converterOptions?: SupabaseConverterOptions }
): Observable<R> {
  return from(input.throwOnError()).pipe(
    tap((response) => console.log('response', response)),
    map((response) => mapSupabaseResponse<T, R>(response, options?.converterOptions))
  );
}
