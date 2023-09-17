import { Injectable } from '@angular/core';
import { ProfileApiService } from 'src/app/api/profiles/services/profile-api.service';
import { AuthUser } from 'src/app/modules/auth/models/auth-user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private readonly profileApiService: ProfileApiService) {}

  getProfile(user: AuthUser): any {
    return this.profileApiService.profile(user);
  }

  updateProfile(profile: { id: string; username: string }): any {
    this.profileApiService.updateProfile(profile);
  }
}
