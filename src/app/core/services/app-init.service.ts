import { Injectable } from '@angular/core';
import { AuthService } from '@auth';

@Injectable({ providedIn: 'root' })
export class AppInitService {
  constructor(private readonly authService: AuthService) {}

  init(): void {
    this.authService.checkAuth();
  }
}
