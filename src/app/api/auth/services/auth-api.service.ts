import { Injectable } from '@angular/core';
import { AuthSession, Subscription as SupabaseSubscription, SupabaseClient } from '@supabase/supabase-js';
import { ReplaySubject, map, Observable } from 'rxjs';
import { AuthSessionResponse } from '../models/auth-session-response';
import { UserContextResponse } from '../models/user-context-response';
import { fromSupabase } from 'src/app/core/supabase/rxjs/from-supabase';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private _supabaseSession: ReplaySubject<AuthSession> = new ReplaySubject(1);
  private _session = this._supabaseSession.pipe(map((session) => (session ? { user: { ...session.user } } : null)));
  private _authChangesSub: SupabaseSubscription;

  constructor(private readonly supabaseClient: SupabaseClient) {}

  authChanges(): Observable<AuthSessionResponse> {
    if (!this._authChangesSub) {
      this.subscribeAuthChanges();
    }

    return this._session;
  }

  getUserContext(userId: string): Observable<UserContextResponse> {
    return fromSupabase<UserContextResponse>(
      this.supabaseClient.from('profiles').select(`first_name,last_name`).eq('id', userId).single()
    );
  }

  signIn(email: string) {
    return this.supabaseClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'http://localhost:4200/'
      }
    });
  }

  signOut() {
    return this.supabaseClient.auth.signOut();
  }

  private subscribeAuthChanges(): void {
    const authStateChange = this.supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log('onAuthStateChange: ', event);

      // TODO emit new value only when session is changed
      this._supabaseSession.next(session);
    });

    this._authChangesSub = authStateChange.data.subscription;
  }
}
