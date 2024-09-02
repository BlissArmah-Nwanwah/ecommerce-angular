import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AuthService } from '../../guard/auth.service';
import { AppState, User } from '../../app.state';
import { forbiddenNameValidator } from '../../shared/forbidden-name-validator.directive';
import { AuthActions } from '../action-types';
import { isLoggedIn } from '../auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  public signupForm!: FormGroup;
  public isLoading = false;
  public errorMessage = '';
  isLoggenIn!: Signal<boolean>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
    this.isLoggenIn = this.store.selectSignal(isLoggedIn);
    if (this.isLoggenIn()) {
      this.router.navigate(['/']);
    }
  }

  public onSubmit() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    let authObs: Observable<User>;
    this.isLoading = true;

    authObs = this.authService.logIn(email, password);

    authObs
      .pipe(
        tap((user) => {
          this.store.dispatch(AuthActions.login({ user: { ...user } }));
          this.router.navigate(['/']);
        })
      )
      .subscribe({
        next: () => {
          this.isLoading = true;
        },
        error: (error) => {
          this.isLoading = false;
          this.signupForm.reset();
          this.errorMessage = error.message;
        },
      });
  }
}
