import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../guard/auth.service';
import { CustomInputFieldComponent } from '../custom-input-field/custom-input-field.component';

interface SignUpRequestData {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  password: string | null;
}

export type ControlNameType = 'email' | 'password' | 'firstName' | 'lastName';

function nameValidator(control: any) {
  const nameRegex = /^[a-zA-Z\s]*$/;
  if (!nameRegex.test(control.value)) {
    return { invalidName: true };
  }
  return null;
}

function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.value;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const minLength = password?.length >= 8;

  const valid =
    hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && minLength;

  if (!valid) {
    return {
      passwordStrength: {
        hasUpperCase,
        hasLowerCase,
        hasDigit,
        hasSpecialChar,
        minLength,
      },
    };
  }

  return null;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    CustomInputFieldComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  public signUpForm = this.formBuilder.group({
    firstName: ['', [Validators.required, nameValidator]],
    lastName: ['', [Validators.required, nameValidator]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordValidator]],
  });

  public isLoading = false;
  public errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  public getControl(controlName: ControlNameType): FormControl {
    return this.signUpForm.get(controlName) as FormControl;
  }

  public submitForm() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value as SignUpRequestData;
      const authObs: Observable<{ message: string }> =
        this.authService.signUp(formData);

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
          error: ({ message }) => {
            this.isLoading = false;
            this.errorMessage = message;
          },
        });
    }
  }
}
