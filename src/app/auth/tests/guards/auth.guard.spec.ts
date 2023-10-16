import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { cold } from 'jasmine-marbles';
import { AuthService, authGuard } from '@auth';

type AuthServiceSpy = jasmine.SpyObj<Pick<AuthService, 'checkAuth' | 'isAuth$' | 'isCheckingAuth$'>>;

describe('Auth Guard', () => {
  const setup = (options: { isAuth: boolean; isCheckingAuthMarble: string }): void => {
    const { isAuth, isCheckingAuthMarble } = options;
    const authService: AuthServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['checkAuth'], {
      isAuth$: cold('(a|)', { a: isAuth }),
      isCheckingAuth$: cold(isCheckingAuthMarble, { a: true, b: false })
    });

    TestBed.configureTestingModule({
      providers: [Router, { provide: AuthService, useValue: authService }]
    });
  };

  it('create spy for AuthService', () => {
    setup({ isAuth: false, isCheckingAuthMarble: '' });
    const authService = TestBed.inject(AuthService);

    expect(authService.checkAuth).toBeDefined();
    expect(authService.isCheckingAuth$).toBeDefined();
    expect(authService.isAuth$).toBeDefined();
  });

  it('never complete if auth checking is not completed', () => {
    const isCheckingAuthMarble = 'a--';
    setup({ isAuth: true, isCheckingAuthMarble });
    const expectedResult = cold('-');
    const result = TestBed.runInInjectionContext(() => authGuard(null, null)) as Observable<boolean>;

    expect(result).toBeObservable(expectedResult);
  });

  describe('sync auth checking', () => {
    const isCheckingAuthMarble = '(ab|)';
    const expected$ = '(a|)';

    it('return UrlTree with path "/login" if user is not logged', () => {
      setup({ isAuth: false, isCheckingAuthMarble });
      const authService = TestBed.inject(AuthService);
      const urlTree = TestBed.inject(Router).createUrlTree(['/login']);
      const expectedResult = cold(expected$, { a: urlTree });
      const result = TestBed.runInInjectionContext(() => authGuard(null, null));

      expect(authService.checkAuth).toHaveBeenCalledTimes(1);
      expect(result).toBeObservable(expectedResult);
    });

    it('return true if user is logged in', () => {
      setup({ isAuth: true, isCheckingAuthMarble });
      const authService = TestBed.inject(AuthService);
      const expectedResult = cold(expected$, { a: true });
      const result = TestBed.runInInjectionContext(() => authGuard(null, null));

      expect(authService.checkAuth).toHaveBeenCalledTimes(1);
      expect(result).toBeObservable(expectedResult);
    });
  });

  describe('async auth checking', () => {
    const isCheckingAuthMarble = 'a--(b|)';
    const expected$ = '---(a|)';

    it('return UrlTree with path "/login" if user is not logged in', () => {
      setup({ isAuth: false, isCheckingAuthMarble });
      const urlTree = TestBed.inject(Router).createUrlTree(['/login']);
      const expectedResult = cold(expected$, { a: urlTree });
      const result = TestBed.runInInjectionContext(() => authGuard(null, null));

      expect(result).toBeObservable(expectedResult);
    });

    it('return true if user is logged in', () => {
      setup({ isAuth: true, isCheckingAuthMarble });
      const expectedResult = cold(expected$, { a: true });
      const result = TestBed.runInInjectionContext(() => authGuard(null, null));

      expect(result).toBeObservable(expectedResult);
    });
  });
});
