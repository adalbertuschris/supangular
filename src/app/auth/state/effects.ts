import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, filter, map, of, tap } from 'rxjs';
import { AuthActions, AuthApiActions } from './actions';
import { selectUserContext } from './selectors';
import { AuthDataService } from '@data/auth';

/* eslint-disable arrow-body-style */
@Injectable({ providedIn: 'root' })
export class AuthEffects {
  checkAuth = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.checkAuth),
      exhaustMap(() =>
        this.authDataService.getSession().pipe(
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
        this.authDataService.signInViaLoginLink(email).pipe(
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
      map(([{ session }]) => AuthActions.loadUserContext({ userId: session.user.id }))
    );
  });

  reloadUserContext = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.reloadUserContext),
      concatLatestFrom(() => this.store.select(selectUserContext)),
      filter(([, userContext]) => !!userContext),
      map(([, { id }]) => AuthActions.loadUserContext({ userId: id }))
    );
  });

  loadUserContext = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadUserContext),
      exhaustMap(({ userId }) =>
        this.authDataService.getUserContext(userId).pipe(
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
        this.authDataService.signOut().pipe(
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
    private readonly authDataService: AuthDataService,
    private readonly router: Router,
    private readonly store: Store
  ) {}
}
