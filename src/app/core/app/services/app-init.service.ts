import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AppInitService {
  constructor(private readonly authService: AuthService) {}

  init(): void {
    this.authService.checkAuth();
  }
}
