import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { AuthApiService } from 'src/app/api/auth/services/auth-api.service';
import { AuthActions, AuthApiActions } from './actions';
import { catchError, exhaustMap, filter, map, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserContext } from './selectors';

/* eslint-disable arrow-body-style */
@Injectable({ providedIn: 'root' })
export class AuthEffects {
  checkAuth = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.checkAuth),
      exhaustMap(() =>
        this.authApiService.getSession().pipe(
          map((session) =>
            session ? AuthApiActions.userAuthenticated({ session }) : AuthApiActions.userNotAuthenticated()
          ),
          catchError((error) => of(AuthApiActions.checkAuthFailure(error)))
        )
      )
    );
  });

  signInViaLoginLink = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInViaLoginLink),
      exhaustMap(({ email }) =>
        this.authApiService.signInViaLoginLink(email).pipe(
          map(() => AuthApiActions.loginLinkSent()),
          catchError((error) => of(AuthApiActions.signInFailure({ error })))
        )
      )
    );
  });

  userAuthenticated = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.userAuthenticated),
      concatLatestFrom(() => this.store.select(selectUserContext)),
      filter(([, userContext]) => !userContext),
      exhaustMap(([{ session }]) =>
        this.authApiService.getUserContext(session.user.id).pipe(
          map((userContext) => AuthApiActions.loadUserContextSuccess({ userContext })),
          catchError((error) => of(AuthApiActions.loadUserContextFailure({ error })))
        )
      )
    );
  });

  signOut = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOut),
      exhaustMap(() =>
        this.authApiService.signOut().pipe(
          map(() => AuthApiActions.signOutSuccess()),
          catchError((error) => of(AuthApiActions.signOutFailure({ error })))
        )
      )
    );
  });

  signOutSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthApiActions.signOutSuccess),
        tap(() => this.router.navigate(['/login']))
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authApiService: AuthApiService,
    private readonly router: Router,
    private readonly store: Store
  ) {}
}
