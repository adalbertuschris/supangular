import { Observable, from, map, tap } from 'rxjs';
import { mapObjectPropsToCamelCase } from '../utils/supabase-object.util';
import { SupabaseConverterOptions } from '../models/supabase-converter-options';

// TODO Write tests

export interface SupabaseResponse<T> {
  count: number;
  data: T;
}

interface SupabaseObject<T> extends PromiseLike<T> {
  throwOnError(): this;
}

const mapSupabaseResponse = <R>(response: SupabaseResponse<any>, converterOptions: SupabaseConverterOptions): R => {
  const { count, data } = response;
  const mappedResponse = mapObjectPropsToCamelCase(data, converterOptions) as R;

  return Array.isArray(mappedResponse)
    ? ({
        totalItems: count, // to get total items we need set count flag in select method
        items: mappedResponse
      } as R)
    : mappedResponse;
};

export function fromSupabase<R>(
  input: SupabaseObject<any>,
  options?: { converterOptions?: SupabaseConverterOptions }
): Observable<R> {
  return from(input.throwOnError()).pipe(
    tap((response) => console.log('response', response)),
    map((response: SupabaseResponse<any>) => mapSupabaseResponse(response, options?.converterOptions))
  );
}
