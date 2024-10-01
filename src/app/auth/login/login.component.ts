import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule,NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../../guard/auth.service';
import { AppState } from '../../app.state';
import { AuthActions } from '../action-types';
import { isLoggedIn } from '../auth.selectors';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, RouterModule, ReactiveFormsModule,NgOptimizedImage,LoaderComponent],
})
export class LoginComponent implements OnInit, OnDestroy {
  public signupForm!: FormGroup;
  public isLoading = false;
  public errorMessage = '';
  public isLoggenIn = this.store.selectSignal(isLoggedIn);
  private authSubscription!: Subscription;
  public constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  //use the formbuilder approach instead
  public ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
    if (this.isLoggenIn()) {
      this.router.navigateByUrl('/home');
    }
  }

  public onSubmit() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    this.isLoading = true;

    const authObs = this.authService.logIn(email, password);
    this.authSubscription = authObs
      .pipe(
        tap((user) => {
          console.log(user);
          this.store.dispatch(AuthActions.login({ user: { ...user } }));
          this.router.navigateByUrl('/home');
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

  public ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
