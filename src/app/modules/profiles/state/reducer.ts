import { createFeature, createReducer, on } from '@ngrx/store';
import { Profile } from '../models/profile';
import { ProfileActions, ProfileApiActions } from './actions';

interface ProfileState {
  profile: Profile;
  isLoading: boolean;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false
};

export const profileFeature = createFeature({
  name: 'profile',
  reducer: createReducer(
    initialState,
    on(ProfileActions.loadProfile, (state): ProfileState => ({ ...state, isLoading: true })),
    on(
      ProfileApiActions.loadProfileSuccess,
      (state, { profile }): ProfileState => ({ ...state, profile, isLoading: false })
    ),
    on(ProfileApiActions.loadProfileFailure, (state): ProfileState => ({ ...state, profile: null, isLoading: false })),
    on(ProfileActions.updateProfile, (state): ProfileState => ({ ...state, isLoading: true })),
    on(
      ProfileApiActions.updateProfileSuccess,
      (state, { profile }): ProfileState => ({ ...state, profile, isLoading: false })
    ),
    on(ProfileApiActions.updateProfileFailure, (state): ProfileState => ({ ...state, isLoading: false }))
  )
});

export const { name, selectProfileState, selectProfile, selectIsLoading } = profileFeature;
