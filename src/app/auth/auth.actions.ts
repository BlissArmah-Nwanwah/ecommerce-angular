/* eslint-disable @typescript-eslint/naming-convention */
import { createActionGroup, emptyProps, props} from '@ngrx/store';
import { User } from '../app.state';
import {LogInRequestData, LogInResponseData} from '../interfaces/auth.interfaces';

export const AUTH_ACTIONS = createActionGroup({
  source: 'Auth',
  events: {
    ' Login': props<LogInRequestData>(),
    'Login Success': props<LogInResponseData>(),
    'Get Auth State': props<User>(),
    'Login Failure': props<{ error: string }>(),
    'Refresh Token Success': props<{
      login_token: string;
      refresh_token: string;
    }>(),
    'Log Out': emptyProps(),
  },
});

