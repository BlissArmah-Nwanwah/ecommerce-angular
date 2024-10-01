/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { logout } from '../auth/auth.actions';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  user: { username: string; role: string };
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  public constructor(private http: HttpClient, private store: Store) {}

  private authApi = environment.AUTH_API_BASEURL;

  public signUp(data: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) {
    return this.http.post<{ message: string }>(`${this.authApi}/user/signup`, {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
    });
  }
  public logIn(email: string, password: string) {
    return this.http.post<{ login_token: string; refresh_token: string }>(
      `${this.authApi}/user/login`,
      {
        email,
        password,
      }
    );
  }

  public validateToken(): Observable<boolean> {
    return this.http.get(`${this.authApi}/user/validate`).pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  public refreshToken(): Observable<boolean> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return of(false);
    }
    return this.http
      .post(`${this.authApi}/user/refresh-token`, {
        refreshToken: JSON.parse(refreshToken),
      })
      .pipe(
        map((response: any) => {
          localStorage.setItem(
            'accessToken',
            JSON.stringify(response.login_token)
          );
          localStorage.setItem(
            'refreshToken',
            JSON.stringify(response.refreshToken)
          );
          return true;
        }),
        catchError(() => {
          this.store.dispatch(logout());
          return of(false);
        })
      );
  }
}
