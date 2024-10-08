import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { logout } from '../auth/auth.actions';
import { environment } from '../../environments/environment';
import {
  SignUpRequestData,
  SignUpResponseData,
  LogInRequestData,
  LogInResponseData,
  RefreshTokenResponseData,
  ValidateTokenResponseData,
} from './auth.interfaces';
import {LocalStorageService} from "../services/localstorage.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authApi = environment.AUTH_API_BASEURL;

  constructor(private http: HttpClient, private store: Store,private localStorageService: LocalStorageService) {}

  public signUp(data: SignUpRequestData): Observable<SignUpResponseData> {
    return this.http.post<SignUpResponseData>(`${this.authApi}/user/signup`, {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
    });
  }

  public logIn(data: LogInRequestData): Observable<LogInResponseData> {
    return this.http.post<LogInResponseData>(`${this.authApi}/user/login`, {
      email: data.email,
      password: data.password,
    });
  }

  public validateToken(): Observable<boolean> {
    return this.http.get<ValidateTokenResponseData>(`${this.authApi}/user/validate`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  public refreshToken(): Observable<boolean> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return of(false);
    }

    return this.http
      .post<RefreshTokenResponseData>(`${this.authApi}/user/refresh-token`, {
        refreshToken: JSON.parse(refreshToken) as string,
      })
      .pipe(
        map((response: RefreshTokenResponseData) => {
          localStorage.setItem('accessToken', JSON.stringify(response.login_token));
          localStorage.setItem('refreshToken', JSON.stringify(response.refresh_token));
          return true;
        }),
        catchError(() => {
          this.store.dispatch(logout());
          return of(false);
        })
      );
  }
}
