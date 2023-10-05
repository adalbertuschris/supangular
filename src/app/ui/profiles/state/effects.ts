import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, take } from 'rxjs';
import { ProfileActions, ProfileApiActions } from './actions';
import { AuthService } from '@auth';
import { ProfileDataService } from '@data/profiles';

/* eslint-disable arrow-body-style */
@Injectable({ providedIn: 'root' })
export class ProfileEffects {
  loadProfile = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.loadProfile),
      exhaustMap(() =>
        this.authService.userContext$.pipe(
          take(1),
          switchMap((userContext) =>
            this.profileDataService.getProfile(userContext.id).pipe(
              map((profile) => ProfileApiActions.loadProfileSuccess({ profile })),
              catchError((error) => of(ProfileApiActions.loadProfileFailure({ error })))
            )
          )
        )
      )
    );
  });

  updateProfile = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.updateProfile),
      exhaustMap(({ id, model }) =>
        this.profileDataService.updateProfile(id, model).pipe(
          map((profile) => ProfileApiActions.updateProfileSuccess({ profile })),
          catchError((error) => of(ProfileApiActions.updateProfileFailure({ error })))
        )
      )
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly profileDataService: ProfileDataService,
    private readonly authService: AuthService
  ) {}
}
