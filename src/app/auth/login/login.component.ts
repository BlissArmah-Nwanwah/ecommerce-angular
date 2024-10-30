import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterModule} from '@angular/router';
import {
  FormBuilder, FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {getAuthError} from '../auth.selectors';
import {LoaderComponent} from '../../loader/loader.component';
import {AUTH_ACTIONS} from '../auth.actions';
import {LogInRequestData} from '../../interfaces/auth.interfaces';
import {CustomInputFieldComponent} from '../custom-input-field/custom-input-field.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgOptimizedImage, LoaderComponent,CustomInputFieldComponent],
})
export class LoginComponent {
  public loginForm: FormGroup = this.formBuilder.group({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
  });

  public errorMessage = this.store.selectSignal(getAuthError);

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
  }

  public get email() {
    return this.loginForm.controls['email'] as FormControl;
  }

  public get password() {
    return this.loginForm.controls['password'] as FormControl;
  }


  public onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LogInRequestData = this.loginForm.value;
      this.store.dispatch(AUTH_ACTIONS.login(loginData));
    }
  }

}
