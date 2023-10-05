import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileActions } from '../state/actions';
import { selectIsLoading, selectProfile } from '../state/reducer';
import { ProfileUpsert } from '../models/profile-upsert';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profile$ = this.store.select(selectProfile);
  isLoading$ = this.store.select(selectIsLoading);

  constructor(private readonly store: Store) {}

  loadProfile(): void {
    this.store.dispatch(ProfileActions.loadProfile());
  }

  updateProfile(id: string, model: ProfileUpsert): void {
    this.store.dispatch(ProfileActions.updateProfile({ id, model }));
  }
}
