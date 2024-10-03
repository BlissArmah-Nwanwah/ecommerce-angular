import { createAction, props } from '@ngrx/store';
import { User } from '../app.state';

export const login = createAction(
  '[Login Page] User Login',
  props<{ user: User }>()
);

export const loginError = createAction(
  '[Login Page] User Login Failed',
  props<{ error: string }>()
);

export const logout = createAction('[Top Menu] User Logout');
