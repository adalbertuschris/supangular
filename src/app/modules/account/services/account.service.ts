import { Injectable } from '@angular/core';
import { ProfileApiService } from 'src/app/api/profiles/services/profile-api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private readonly profileApiService: ProfileApiService) {}

  getProfile(userId: string) {
    return this.profileApiService.getProfile(userId);
  }

  updateProfile(profile: { id: string; username: string }): any {
    this.profileApiService.updateProfile(profile);
  }
}
