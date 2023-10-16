import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { loginGuard, AuthService } from '@auth';

describe('Login Guard', () => {
  const setup = ({ isAuth }: { isAuth: boolean }): void => {
    const authService: Pick<AuthService, 'isAuth$'> = { isAuth$: of(isAuth) };

    TestBed.configureTestingModule({
      providers: [Router, { provide: AuthService, useValue: authService }]
    });
  };

  it('return true if the user is not logged in', () => {
    setup({ isAuth: false });
    const authService = TestBed.inject(AuthService);
    const expectedResult = cold('(a|)', { a: true });
    const loginGuardResult = TestBed.runInInjectionContext(() => loginGuard(null, null));

    expect(authService.isAuth$).toBeDefined();
    expect(loginGuardResult).toBeObservable(expectedResult);
  });

  it('return UrlTree with path "/" if the user is logged in', () => {
    setup({ isAuth: true });
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);
    const urlTree = router.createUrlTree(['/']);
    const expectedResult = cold('(a|)', { a: urlTree });
    const loginGuardResult = TestBed.runInInjectionContext(() => loginGuard(null, null));

    expect(authService.isAuth$).toBeDefined();
    expect(loginGuardResult).toBeObservable(expectedResult);
  });
});
