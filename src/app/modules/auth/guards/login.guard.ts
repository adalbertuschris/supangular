import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

// TODO Write tests
export const loginGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);

  return inject(AuthService).isAuth$.pipe(map((isAuth) => (!isAuth ? true : router.createUrlTree(['/']))));
};
