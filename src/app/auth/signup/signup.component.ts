import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AppState, User } from '../../app.state';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { isLoggedIn } from '../auth.selectors';
import { AuthService } from '../../guard/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signUpForm!: FormGroup;
  showPassword: boolean = false;
  isLoggenIn$: Observable<boolean> = new Observable();
  public isLoading = false;
  public errorMessage = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.isLoggenIn$ = this.store.pipe(select(isLoggedIn));
    // if (this.isLoggenIn$) {
    //   this.router.navigate(['/']);
    // }
  }
  formAction() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      console.log(formData);
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
