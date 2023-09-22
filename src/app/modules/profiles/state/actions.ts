import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Profile } from '../models/profile';
import { ProfileUpsert } from '../models/profile-upsert';
import { ApiError } from 'src/app/api/base/models/api-error';

/* eslint-disable @typescript-eslint/naming-convention */
export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Load profile': emptyProps(),
    'Update profile': props<{ id: string; model: ProfileUpsert }>()
  }
});

export const ProfileApiActions = createActionGroup({
  source: 'Profile API',
  events: {
    'Load profile success': props<{ profile: Profile }>(),
    'Load profile failure': props<{ error: ApiError }>(),
    'Update profile success': props<{ profile: Profile }>(),
    'Update profile failure': props<{ error: ApiError }>()
  }
});
