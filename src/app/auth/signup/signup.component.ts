import {Component} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from '../../guard/auth.service';
import {CustomInputFieldComponent} from '../custom-input-field/custom-input-field.component';
import {SignUpRequestData} from '../../interfaces/auth.interfaces';
import {nameValidator} from "../../utils/utils";
import {passwordValidator} from "../../shared/password.validator";
import {ControlNameType} from "../../interfaces/types";

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
  ) {
  }

  public getControl(
    controlName: ControlNameType
  ): FormControl {
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
          error: ({message}) => {
            this.isLoading = false;
            this.errorMessage = message;
          },
        });
    }
  }
}
