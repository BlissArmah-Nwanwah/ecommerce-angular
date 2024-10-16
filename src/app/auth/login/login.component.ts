import {Component, OnInit, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AuthService} from '../../guard/auth.service';
import {AppState, User} from '../../app.state';
import {forbiddenNameValidator} from '../../shared/forbidden-name-validator.directive';
import {AuthActions} from '../action-types';
import {isLoggedIn} from '../auth.selectors';
import {CustomInputFieldComponent} from "../custom-input-field/custom-input-field.component";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, RouterModule, ReactiveFormsModule,CustomInputFieldComponent],
})
export class LoginComponent implements OnInit {
  public loginForm=this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  public isLoading = false;
  public errorMessage = '';
  isLoggenIn!: Signal<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
  private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.isLoggenIn = this.store.selectSignal(isLoggedIn);
    if (this.isLoggenIn()) {
      this.router.navigate(['/home']);
    }
  }


  public get email() {
    return this.loginForm.controls['email'];
  }

  public get password() {
    return this.loginForm.controls['password'];
  }

  public onSubmit()
    {
      const email = this.loginForm.value.email ?? '';
      const password = this.loginForm.value.password ?? '';

      let authObs: Observable<User>;
      this.isLoading = true;

      authObs = this.authService.logIn(email, password);

      authObs
        .pipe(
          tap((user) => {
            this.store.dispatch(AuthActions.login({user: {...user}}));
            this.router.navigate(['/home']);
          })
        )
        .subscribe({
          next: () => {
            this.isLoading = true;
          },
          error: (error) => {
            this.isLoading = false;
            this.loginForm.reset();
            this.errorMessage = error.message;
          },
        });
    }
  }
