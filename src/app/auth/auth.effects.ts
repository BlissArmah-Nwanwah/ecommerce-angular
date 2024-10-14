import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {Router} from '@angular/router';
import {AUTH_ACTIONS} from './auth.actions';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../guard/auth.service';

@Injectable()
export class AuthEffects {
  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AUTH_ACTIONS.login),
      switchMap(({email, password}) =>
        this.authService.logIn({email, password}).pipe(
          map((response) => {
            this.router.navigateByUrl('/home');
            return AUTH_ACTIONS.loginSuccess(response);
          }),
          catchError((error: HttpErrorResponse) => {
            return of(AUTH_ACTIONS.loginFailure({error: error.message}));
          })
        )
      )
    )
  );
  public logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AUTH_ACTIONS.logOut),
        tap(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          this.router.navigateByUrl('/');
        })
      ),
    {dispatch: false}
  );

  constructor(private actions$: Actions, private router: Router, private authService: AuthService) {
  }
}
