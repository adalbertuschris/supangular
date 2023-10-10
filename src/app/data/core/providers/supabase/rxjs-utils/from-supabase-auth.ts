import { Observable, from, of, switchMap, throwError } from 'rxjs';
import { SupabaseAuthResponse } from '../models/supabase-response';

export function fromSupabaseAuth<R>(input: Promise<SupabaseAuthResponse<R>>): Observable<R> {
  return from(input).pipe(switchMap(({ data, error }) => (error ? throwError(() => error) : of(data || null))));
}
