import { createReducer, on } from '@ngrx/store';
import { UserContext } from '../models/user-context';
import { AuthSession } from '../models/auth-session';
import { AuthActions, AuthApiActions } from './actions';
import { AuthUser } from '../models/auth-user';

export interface AuthState {
  isAuth: boolean;
  isCheckingAuth: boolean;
  authUser: AuthUser;
  userContext: UserContext;
  session: AuthSession;
  isSigningIn: boolean;
  loginLinkSent: boolean;
}

const initialState: AuthState = {
  isAuth: undefined,
  isCheckingAuth: false,
  authUser: undefined,
  userContext: undefined,
  session: undefined,
  isSigningIn: false,
  loginLinkSent: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.signInViaLoginLink, (state): AuthState => ({ ...state, isSigningIn: true })),
  on(
    AuthApiActions.loginLinkSent,
    (state): AuthState => ({
      ...state,
      loginLinkSent: true,
      isSigningIn: false
    })
  ),
  on(
    AuthApiActions.signInFailure,
    (state): AuthState => ({
      ...state,
      isSigningIn: false
    })
  ),
  on(AuthActions.checkAuth, (state): AuthState => ({ ...state, isCheckingAuth: true })),
  on(
    AuthApiActions.userAuthenticated,
    (state, { session }): AuthState => ({ ...state, session, isAuth: true, isCheckingAuth: false })
  ),
  on(
    AuthApiActions.userNotAuthenticated,
    (state): AuthState => ({
      ...state,
      session: null,
      userContext: null,
      isAuth: false,
      isCheckingAuth: false
    })
  ),
  on(
    AuthApiActions.loadUserContextSuccess,
    (state, { userContext }): AuthState => ({
      ...state,
      userContext: { email: state.session.user.email, ...userContext }
    })
  ),
  on(
    AuthApiActions.loadUserContextFailure,
    (state): AuthState => ({
      ...state,
      userContext: null
    })
  ),
  on(
    AuthApiActions.signOutSuccess,
    (state): AuthState => ({
      ...state,
      userContext: null,
      session: null,
      isAuth: false
    })
  )
);
