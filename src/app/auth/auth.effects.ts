import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {Router} from '@angular/router';
import {AUTH_ACTIONS} from './auth.actions';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../guard/auth.service';
import {LocalStorageService} from '../services/localstorage.service';

@Injectable()
export class AuthEffects {
  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AUTH_ACTIONS.login),
      switchMap(loginData =>
        this.authService.logIn(loginData).pipe(
          tap(() => this.router.navigateByUrl('/home')),
          map(response => AUTH_ACTIONS.loginSuccess(response)),
          catchError((error: HttpErrorResponse) =>
            of(AUTH_ACTIONS.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );


  public logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AUTH_ACTIONS.logOut),
        tap(() => {
          this.localStorageService.removeItems([
            'user',
            'accessToken',
            'refreshToken',
          ]);
          this.router.navigateByUrl('/');
        })
      ),
    {dispatch: false}
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly localStorageService: LocalStorageService
  ) {
  }
}
