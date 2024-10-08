import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {catchError, of, Subscription, tap} from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AuthService} from '../../guard/auth.service';
import {AppState} from '../../app.state';
import {AuthActions} from '../action-types';
import {getAuthError, isLoggedIn} from '../auth.selectors';
import {LoaderComponent} from '../../loader/loader.component';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgOptimizedImage, LoaderComponent],
})
export class LoginComponent implements OnInit {
  public signupForm!: FormGroup;
  public errorMessage = this.store.selectSignal(getAuthError);
  public isLoggedIn = this.store.selectSignal(isLoggedIn);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.handleFormChange()
    if (this.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
  }

  public handleFormChange() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

  }

  public onSubmit() {
    const loginData = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    }

    const authObs = this.authService.logIn(loginData);
    authObs
      .pipe(
        tap((user) => {
          this.store.dispatch(AuthActions.login({user: {...user, isLoading: false, error: null}}));
          this.router.navigateByUrl('/home');
        }),
        catchError((error) => {
          this.store.dispatch(AuthActions.loginError({error: error.message || 'Login failed'}));
          return of();
        }
  ),
    takeUntilDestroyed()
  ).
    subscribe();
  }

}
