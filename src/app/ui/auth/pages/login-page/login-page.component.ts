import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth';

@Component({
  selector: 'vt-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  isLoading$ = this.authService.isSigningIn$;

  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder
  ) {
    this.authService.loginLinkSent$.subscribe((isLoginLinkSent) => {
      if (isLoginLinkSent) {
        alert('Check your email for the login link!');
        this.signInForm.reset();
      }
    });
  }

  async onSubmit(): Promise<void> {
    const email = this.signInForm.value.email as string;
    this.authService.signIn(email);
  }
}
