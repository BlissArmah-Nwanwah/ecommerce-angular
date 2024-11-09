import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { getAuthError } from '../auth.selectors';
import { LoaderComponent } from '../../loader/loader.component';
import { AUTH_ACTIONS } from '../auth.actions';
import { LogInRequestData } from '../../interfaces/auth.interfaces';
import { CustomInputFieldComponent } from '../custom-input-field/custom-input-field.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    LoaderComponent,
    CustomInputFieldComponent,
  ],
})
export class LoginComponent {
  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public errorMessage = this.store.selectSignal(getAuthError);

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  public getControl(controlName: 'email' | 'password'): FormControl {
    return this.loginForm.get(controlName) as FormControl;
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value as LogInRequestData;
      this.store.dispatch(AUTH_ACTIONS.login(loginData));
    }
  }
}
