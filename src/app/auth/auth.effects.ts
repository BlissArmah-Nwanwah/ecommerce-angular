import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './action-types';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  public login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap(({ user }) => {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('accessToken', JSON.stringify(user.login_token));
          localStorage.setItem(
            'refreshToken',
            JSON.stringify(user.refresh_token)
          );
        })
      ),
    { dispatch: false }
  );

  public logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );
  public constructor(private actions$: Actions, private router: Router) {}
}
