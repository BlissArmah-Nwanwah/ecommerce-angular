import {Component} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AppState} from '../../app.state';
import {select, Store} from '@ngrx/store';
import {Observable, tap} from 'rxjs';
import {isLoggedIn} from '../auth.selectors';
import {AuthService} from '../../guard/auth.service';
import {CustomInputFieldComponent} from "../custom-input-field/custom-input-field.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, CustomInputFieldComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signUpForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  showPassword: boolean = false;
  isLoggenIn$: Observable<boolean> = new Observable();
  public isLoading = false;
  public errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.isLoggenIn$ = this.store.pipe(select(isLoggedIn));
    if (this.isLoggenIn$) {
      this.router.navigateByUrl('/');
    }
  }


  public get firstName() {
    return this.signUpForm.controls.firstName;
  }

  public get lastName() {
    return this.signUpForm.controls.lastName;
  }

  public get email() {
    return this.signUpForm.controls.email;
  }

  public get password() {
    return this.signUpForm.controls.password;
  }

  formAction() {
    if (this.signUpForm.valid) {
      const formData = {
        email: this.email.value || '',
        firstName: this.firstName.value || '',
        lastName: this.lastName.value || '',
        password: this.password.value || '',
      };

      let authObs: Observable<{ message: string }>;
      authObs = this.authService.signUp(formData);

      authObs
        .pipe(
          tap(() => {
            this.router.navigate(['/login']);
          })
        )
        .subscribe({
          next: () => {
            this.isLoading = true;
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = error.message;
          },
        });
    }
  }


  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
