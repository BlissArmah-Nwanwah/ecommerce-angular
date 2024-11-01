import {Component} from '@angular/core';
import {
  FormBuilder, FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from '../../guard/auth.service';
import {CustomInputFieldComponent} from '../custom-input-field/custom-input-field.component';
import {SignUpRequestData} from "../../interfaces/auth.interfaces";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, CustomInputFieldComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  public signUpForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  public isLoading = false;
  public errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  public getControl(controlName: 'email' | 'password'|'firstName'|'lastName'): FormControl {
    return this.signUpForm.get(controlName) as FormControl;
  }

  public formAction() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value as SignUpRequestData;
      const authObs: Observable<{ message: string }> = this.authService.signUp(formData);

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

}
