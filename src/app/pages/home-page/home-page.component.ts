import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'vt-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  userContext$ = this.authService.userContext$;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  goToMyProfile(): void {
    this.router.navigate(['/my-profile']);
  }
}
