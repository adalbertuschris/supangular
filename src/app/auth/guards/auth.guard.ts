import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { exhaustMap, map, skipWhile } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  authService.checkAuth();

  return authService.isCheckingAuth$.pipe(
    skipWhile((isChecking) => isChecking),
    exhaustMap(() => authService.isAuth$),
    map((isAuth) => (isAuth ? true : router.createUrlTree(['/login'])))
  );
};
