import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AUTH_ACTIONS} from '../auth/auth.actions';
import {environment} from '../../environments/environment';
import {
  SignUpRequestData,
  SignUpResponseData,
  LogInRequestData,
  LogInResponseData,
  RefreshTokenResponseData,
  ValidateTokenResponseData,
} from '../interfaces/auth.interfaces';
import {LocalStorageService} from '../services/localstorage.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  private authApi = environment.AUTH_API_BASEURL;

  constructor(private http: HttpClient, private store: Store, private localStorageService: LocalStorageService) {
  }

  public signUp(data: SignUpRequestData): Observable<SignUpResponseData> {
    return this.http.post<SignUpResponseData>(`${this.authApi}/user/signup`, data);
  }

  public logIn(data: LogInRequestData): Observable<LogInResponseData> {
    return this.http.post<LogInResponseData>(`${this.authApi}/user/login`, data);
  }

  public validateToken(): Observable<boolean> {
    return this.http.get<ValidateTokenResponseData>(`${this.authApi}/user/validate`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  public refreshToken(): Observable<boolean> {
    const refreshToken = this.localStorageService.getItem('refreshToken') as string;
    if (!refreshToken) {
      return of(false);
    }

    return this.http
      .post<RefreshTokenResponseData>(`${this.authApi}/user/refresh-token`, {
        refreshToken: JSON.parse(refreshToken),
      })
      .pipe(
        map((response: RefreshTokenResponseData) => {
          this.localStorageService.setItem('accessToken', JSON.stringify(response.login_token));
          this.localStorageService.setItem('refreshToken', JSON.stringify(response.refresh_token));
          return true;
        }),
        catchError(() => {
          this.store.dispatch(AUTH_ACTIONS.logOut());
          return of(false);
        })
      );
  }
}
