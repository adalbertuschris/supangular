import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@auth';

@Injectable({ providedIn: 'root' })
export class AppInitService {
  constructor(
    private readonly authService: AuthService,
    private readonly translateService: TranslateService
  ) {}

  init(): void {
    this.authService.checkAuth();
    this.translateService.use('en-US');
  }
}
