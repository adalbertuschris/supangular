import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { inject } from '@angular/core';
import { Profile } from '../models/profile';
import { filter } from 'rxjs';

export const profileResolver: ResolveFn<Profile> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const profileService = inject(ProfileService);
  profileService.loadProfile();

  return profileService.profile$.pipe(filter((profile) => !!profile));
};
