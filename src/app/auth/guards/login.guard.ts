import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);

  return inject(AuthService).isAuth$.pipe(map((isAuth) => (!isAuth ? true : router.createUrlTree(['/']))));
};
