import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {getAuthError, isLoggedIn} from '../auth.selectors';
import {LoaderComponent} from '../../loader/loader.component';
import {AUTH_ACTIONS} from '../auth.actions';
import {LogInRequestData} from "../../interfaces/auth.interfaces";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgOptimizedImage, LoaderComponent],
})
export class LoginComponent implements OnInit {
  public signupForm!: FormGroup;
  public errorMessage = this.store.selectSignal(getAuthError);
  public isLoggedIn = this.store.selectSignal(isLoggedIn);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.handleFormChange();
    if (this.isLoggedIn()) {
      void this.router.navigateByUrl('/home');
    }
  }

  public handleFormChange() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

  }

  public onSubmit() {
    const loginData = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };

    this.store.dispatch(
      AUTH_ACTIONS.login(loginData as LogInRequestData)
    );
  }

}
