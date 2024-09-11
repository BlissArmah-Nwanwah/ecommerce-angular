import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './action-types';
import { User } from '../app.state';

export const initialState: User = {
  login_token: null,
  refresh_token: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (_, { user }) => user),
  on(AuthActions.logout, () => ({ login_token: null, refresh_token: null }))
);
