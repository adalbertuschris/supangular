import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './modules/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './modules/auth/pages/register-page/register-page.component';
import { AccountPageComponent } from './modules/account/pages/account-page/account-page.component';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/pages/login-page/login-page.component').then(() => LoginPageComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./modules/auth/pages/register-page/register-page.component').then(() => RegisterPageComponent)
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./modules/account/pages/account-page/account-page.component').then(() => AccountPageComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
