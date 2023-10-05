import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserContext } from '../models/user-context';
import { AuthSession } from '../models/auth-session';
import { ApiError } from '@data/core';

/* eslint-disable @typescript-eslint/naming-convention */
export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Sign in via login link': props<{ email: string }>(),
    'Sign out': emptyProps(),
    'Load user context': props<{ userId: string }>(),
    'Check auth': emptyProps()
  }
});

export const AuthApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    'Login link sent': emptyProps(),
    'Sign in failure': props<{ error: ApiError }>(),
    'Sign out success': emptyProps(),
    'Sign out failure': props<{ error: ApiError }>(),
    'Load user context success': props<{ userContext: UserContext }>(),
    'Load user context failure': props<{ error: ApiError }>(),
    'User authenticated': props<{ session: AuthSession }>(),
    'User not authenticated': emptyProps(),
    'Check auth failure': props<{ error: ApiError }>()
  }
});
