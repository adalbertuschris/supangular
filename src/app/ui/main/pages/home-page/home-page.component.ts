import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth';

@Component({
  selector: 'vt-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  userContext$ = this.authService.userContext$;
  isAuth$ = this.authService.isAuth$;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  goToMyProfile(): void {
    this.router.navigate(['/my-profile']);
  }

  signIn(): void {
    this.router.navigate(['/login']);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
