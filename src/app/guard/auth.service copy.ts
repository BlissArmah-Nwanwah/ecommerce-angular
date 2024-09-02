import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from './guardtype';

export interface AuthResponseData {
  user: {  username: string; role: string };
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  public user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  logIn(username: string, password: string) {
    return this.http
      .post<AuthResponseData>('https://fakestoreapi.com/auth/login', {
        username,
        password,
      })
      .pipe(
        tap((resData) => {
          this.handleAuthentication(resData.token);
        }),
        catchError((error) => {
          console.error('Error in login:', error);
          throw error;
        })
      );
  }

  autoLogin() {
    const token = this.cookieService.get('token');

    if (token) {
      const loadedUser = new User(token);
      if (loadedUser.tokens) {
        this.user.next(loadedUser);
      }
    }
  }

  logout() {
    this.user.next(null);
    this.cookieService.delete('token');
    this.router.navigate(['/']);
  }

  private handleAuthentication(token: string) {
    const user = new User(token);
    this.user.next(user);

    // Set cookies
    this.cookieService.set('token', token);
  }
}
