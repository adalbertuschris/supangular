import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileApiService } from 'src/app/api/profiles/services/profile-api.service';
import { ProfileActions, ProfileApiActions } from './actions';
import { catchError, exhaustMap, map, of, switchMap, take } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

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
            this.profileApiService.getProfile(userContext.id).pipe(
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
        this.profileApiService.updateProfile(id, model).pipe(
          map((profile) => ProfileApiActions.updateProfileSuccess({ profile })),
          catchError((error) => of(ProfileApiActions.updateProfileFailure({ error })))
        )
      )
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly profileApiService: ProfileApiService,
    private readonly authService: AuthService
  ) {}
}
