import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SignupComponent } from './signup.component';
import { AuthService } from '../../guard/auth.service';
import { ActivatedRoute } from '@angular/router';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    authServiceMock = {
      signUp: jest.fn().mockReturnValue(of({ message: 'Success' })),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    activatedRouteMock = {
      snapshot: { queryParams: {} },
    };

    await TestBed.configureTestingModule({
      imports: [SignupComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call signUp and navigate on successful form submission', () => {
    component.signUpForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password123',
    });

    component.formAction();

    expect(authServiceMock.signUp).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    expect(component.isLoading).toBe(true);
  });

  it('should handle error on signUp failure', () => {
    component.signUpForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password123',
    });

    authServiceMock.signUp.mockReturnValue(throwError(() => ({ message: 'Sign-up failed' })));

    component.formAction();

    expect(authServiceMock.signUp).toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe('Sign-up failed');
  });
});
