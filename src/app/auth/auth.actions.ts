/* eslint-disable @typescript-eslint/naming-convention */
import { createActionGroup, emptyProps, props} from '@ngrx/store';
import { User } from '../app.state';
import {LoginRequestBody, LoginResponseBody} from '../interfaces/auth';

export const AUTH_ACTIONS = createActionGroup({
  source: 'Auth',
  events: {
    ' Login': props<LoginRequestBody>(),
    'Login Success': props<LoginResponseBody>(),
    'Get Auth State': props<User>(),
    'Login Failure': props<{ error: string }>(),
    'Refresh Token Success': props<{
      login_token: string;
      refresh_token: string;
    }>(),
    'Log Out': emptyProps(),
  },
});

