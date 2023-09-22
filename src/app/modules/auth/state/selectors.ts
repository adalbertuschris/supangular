import { createSelector } from '@ngrx/store';
import { AuthState } from './reducers';

const selectAuthState = (state: { auth: AuthState }): AuthState => state.auth;

export const selectIsAuth = createSelector(selectAuthState, (state) => state.isAuth);
export const selectIsCheckingAuth = createSelector(selectAuthState, (state) => state.isCheckingAuth);
export const selectIsSigningIn = createSelector(selectAuthState, (state) => state.isSigningIn);
export const selectUserContext = createSelector(selectAuthState, (state) => state.userContext);
export const selectLoginLinkSent = createSelector(selectAuthState, (state) => state.loginLinkSent);
