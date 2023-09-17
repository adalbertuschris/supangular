import { Injectable } from '@angular/core';
import { AuthChangeEvent, AuthSession, Session, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  _session: AuthSession | null = null;

  constructor(private readonly supabaseClient: SupabaseClient) {}

  get session() {
    this.supabaseClient.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabaseClient.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabaseClient.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.supabaseClient.auth.signOut();
  }
}
