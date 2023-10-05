import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { filter } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';

export const profileResolver: ResolveFn<Profile> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const profileService = inject(ProfileService);
  profileService.loadProfile();

  return profileService.profile$.pipe(filter((profile) => !!profile));
};
