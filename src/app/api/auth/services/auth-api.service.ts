import { Injectable } from '@angular/core';
import { AuthSession, SupabaseClient } from '@supabase/supabase-js';
import { Observable, map } from 'rxjs';
import { UserContextResponse } from '../models/user-context-response';
import { fromSupabase } from 'src/app/core/supabase/rxjs/from-supabase';
import { SignInResponse } from '../models/sign-in-response';
import { fromSupabaseAuth } from 'src/app/core/supabase/rxjs/from-supabase-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  getSession(): Observable<AuthSession> {
    return fromSupabaseAuth(this.supabaseClient.auth.getSession()).pipe(map(({ session }) => session));
  }

  // TODO Change emailRedirectTo
  signInViaLoginLink(email: string): Observable<SignInResponse> {
    return fromSupabaseAuth(
      this.supabaseClient.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: 'http://localhost:4200/'
        }
      })
    );
  }

  signOut(): Observable<void> {
    return fromSupabaseAuth(this.supabaseClient.auth.signOut());
  }

  getUserContext(userId: string): Observable<UserContextResponse> {
    return fromSupabase<UserContextResponse>(
      this.supabaseClient.from('profiles').select(`id,first_name,last_name`).eq('id', userId).single()
    );
  }
}
