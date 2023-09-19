import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './modules/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './modules/auth/pages/register-page/register-page.component';
import { AccountPageComponent } from './modules/account/pages/account-page/account-page.component';
import { authGuard } from './modules/auth/guards/auth.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { loginGuard } from './modules/auth/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/pages/login-page/login-page.component').then(() => LoginPageComponent),
    canActivate: [loginGuard]
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./modules/auth/pages/register-page/register-page.component').then(() => RegisterPageComponent),
    canActivate: [loginGuard]
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./modules/account/pages/account-page/account-page.component').then(() => AccountPageComponent),
    canMatch: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
