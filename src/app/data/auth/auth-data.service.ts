import { Injectable } from '@angular/core';
import { AuthSession, SupabaseClient } from '@supabase/supabase-js';
import { Observable, map } from 'rxjs';
import { UserContextResponse } from './models/user-context-response';
import { SignInResponse } from './models/sign-in-response';
import { SupabaseResponse, fromSupabase, fromSupabaseAuth } from '../core/providers/remote/supabase';

type UserContextSupabaseResponse = {
  id: string;
  first_name: string;
  last_name: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
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
    return fromSupabase<SupabaseResponse<UserContextSupabaseResponse>, UserContextResponse>(
      this.supabaseClient.from('profiles').select('id,last_name,first_name').eq('id', userId).single()
    );
  }
}
