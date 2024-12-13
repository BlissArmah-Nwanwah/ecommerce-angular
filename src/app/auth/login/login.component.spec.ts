import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginComponent } from './login.component';
import { AUTH_ACTIONS } from '../auth.actions';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let storeMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    storeMock = {
      selectSignal: jest.fn().mockReturnValue(of(null)),
      dispatch: jest.fn(),
    };

    activatedRouteMock = {
      snapshot: { queryParams: {} },
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule, LoginComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch login action on form submit', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password',
    });
    component.onSubmit();
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      AUTH_ACTIONS.login({ email: 'test@example.com', password: 'password' })
    );
  });
});
