/* eslint-disable @typescript-eslint/naming-convention */
import {createReducer, on} from '@ngrx/store';
import { AUTH_ACTIONS } from './auth.actions';
import {User} from '../app.state';

export const initialState: User = {
  login_token: undefined,
  refresh_token: undefined,
  isLoading: false,
  error: undefined,
  message:undefined
};

export const authReducer = createReducer(
  initialState,
  on(AUTH_ACTIONS.login, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(
    AUTH_ACTIONS.loginSuccess,
    (state, { login_token, refresh_token }) => ({
      ...state,
      login_token,
      refresh_token,
      loading: false,
    })
  ),
  on(AUTH_ACTIONS.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(
    AUTH_ACTIONS.getAuthState,
    (state, { login_token, refresh_token, message }) => ({
      ...state,
      login_token,
      refresh_token,
      message,
    })
  ),
  on(
    AUTH_ACTIONS.refreshTokenSuccess,
    (state, { login_token, refresh_token }) => ({
      ...state,
      login_token,
      refresh_token,
    })
  ),
  on(AUTH_ACTIONS.logOut, (state) => ({
    ...state,
    login_token: undefined,
    refresh_token: undefined,
    message: undefined,
  }))
);
