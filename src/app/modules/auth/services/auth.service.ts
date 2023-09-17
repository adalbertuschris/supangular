import { AuthApiService } from 'src/app/api/auth/services/auth-api.service';
import { AuthUser } from '../models/auth-user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get authUser(): AuthUser {
    return this.authApiService.session?.user as AuthUser;
  }

  constructor(private readonly authApiService: AuthApiService) {}

  signIn(email: string): Promise<any> {
    return this.authApiService.signIn(email);
  }

  signOut(): Promise<any> {
    return this.authApiService.signOut();
  }
}
