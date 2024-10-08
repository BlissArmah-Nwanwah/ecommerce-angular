import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AppState} from '../../app.state';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription, tap} from 'rxjs';
import {isLoggedIn} from '../auth.selectors';
import {AuthService} from '../../guard/auth.service';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, NgOptimizedImage],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup;
  public showPassword = false;
  public isLoggenIn$ = new Observable<boolean>();
  public authSignUpSubscription!: Subscription;
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
    this.handleFormChanges()
    this.isLoggenIn$ = this.store.pipe(select(isLoggedIn));
  }

  public handleFormChanges() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public formAction() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      const authObs = this.authService.signUp(formData);
      this.authSignUpSubscription = authObs
        .pipe(takeUntilDestroyed())
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/login');
            this.isLoading = true;
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = error.message;
          },
        });
    }
  }

  public togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
