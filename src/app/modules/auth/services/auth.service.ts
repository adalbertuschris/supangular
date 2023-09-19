import { AuthApiService } from 'src/app/api/auth/services/auth-api.service';
import { AuthUser } from '../models/auth-user';
import { Injectable } from '@angular/core';
import { Observable, from, map, shareReplay, switchMap, tap } from 'rxjs';
import { AuthSession } from '../models/auth-session';
import { UserContext } from '../models/user-context';
import { UserContextResponse } from 'src/app/api/auth/models/user-context-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth$: Observable<boolean>;
  authUser$: Observable<AuthUser>;
  userContext$: Observable<UserContext>;
  private _session: AuthSession;

  get authUser(): AuthUser {
    return this.getAuthUser(this._session);
  }

  get isAuth(): boolean {
    return this.getIsAuth(this._session);
  }

  constructor(private readonly authApiService: AuthApiService) {
    const authChanges$ = this.authApiService.authChanges().pipe(
      tap((session) => (this._session = session)),
      tap(console.log),
      shareReplay(1)
    );

    this.isAuth$ = authChanges$.pipe(map((session) => this.getIsAuth(session)));
    this.authUser$ = authChanges$.pipe(map((session) => this.getAuthUser(session)));
    this.userContext$ = authChanges$.pipe(
      switchMap((session) =>
        from(this.authApiService.getUserContext(session.user.id)).pipe(
          tap(console.log),
          map((user: UserContextResponse) => ({ id: session.user.id, email: session.user.email, ...user }))
        )
      )
    );
  }

  signIn(email: string): Promise<any> {
    return this.authApiService.signIn(email);
  }

  signOut(): Promise<any> {
    return this.authApiService.signOut();
  }

  private getIsAuth(session: AuthSession): boolean {
    return !!session;
  }

  private getAuthUser(session: AuthSession): AuthUser {
    return session?.user;
  }
}
