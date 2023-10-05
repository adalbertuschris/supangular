import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './ui/main/pages/home-page/home-page.component';
import { authGuard, loginGuard } from '@auth';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./ui/auth/pages/login-page/login-page.component').then((m) => m.LoginPageComponent),
    canActivate: [loginGuard]
  },
  // {
  //   path: 'sign-up',
  //   loadComponent: () =>
  //     import('./ui/auth/pages/register-page/register-page.component').then((m) => m.RegisterPageComponent),
  //   canActivate: [loginGuard]
  // },
  {
    path: 'my-profile',
    loadChildren: () => import('./ui/profiles/profiles.module').then((m) => m.ProfilesModule),
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
