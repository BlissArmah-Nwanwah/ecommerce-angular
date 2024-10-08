import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../app.state';

export const selectAuthState = createFeatureSelector<User>('auth');

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.login_token
);
export const isLoggedOut = createSelector(
  isLoggedIn,
  (isLoggedIn) => !isLoggedIn
);
