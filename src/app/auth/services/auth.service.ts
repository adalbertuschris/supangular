import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, skipWhile, switchMap } from 'rxjs';
import { AuthActions } from '../state/actions';
import {
  selectLoginLinkSent,
  selectIsAuth,
  selectIsCheckingAuth,
  selectIsSigningIn,
  selectUserContext
} from '../state/selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isSigningIn$ = this.store.select(selectIsSigningIn);
  isAuth$ = this.store.select(selectIsAuth).pipe(skipWhile((isAuth) => isAuth === undefined));
  isCheckingAuth$ = this.store.select(selectIsCheckingAuth);
  userContext$ = this.isAuth$.pipe(
    switchMap((isAuth) => this._userContext$.pipe(filter((userContext) => !(isAuth && !userContext))))
  );
  loginLinkSent$ = this.store.select(selectLoginLinkSent);

  private _userContext$ = this.store.select(selectUserContext);

  constructor(private readonly store: Store) {}

  checkAuth(): void {
    this.store.dispatch(AuthActions.checkAuth());
  }

  signIn(email: string): void {
    this.store.dispatch(AuthActions.signInViaLoginLink({ email }));
  }

  signOut(): void {
    this.store.dispatch(AuthActions.signOut());
  }
}
