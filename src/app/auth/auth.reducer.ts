import {createReducer, on} from '@ngrx/store';
import {AuthActions} from './action-types';
import {User} from '../app.state';

export const initialState: User = {
  login_token: null,
  refresh_token: null,
  isLoading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (_, { user }) => ({
    ...user,
    isLoading: false,
    error: null
  })),
  on(AuthActions.loginError, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(AuthActions.logout, () => ({
    login_token: null,
    refresh_token: null,
    isLoading: false,
    error: null
  }))
);
