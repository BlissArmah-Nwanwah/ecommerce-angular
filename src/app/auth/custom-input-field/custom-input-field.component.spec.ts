import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CustomInputFieldComponent } from './custom-input-field.component';

describe('CustomInputFieldComponent', () => {
  let component: CustomInputFieldComponent;
  let fixture: ComponentFixture<CustomInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomInputFieldComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomInputFieldComponent);
    component = fixture.componentInstance;
  });

  const initializeComponent = (
    label: string,
    placeholder: string,
    control: FormControl
  ) => {
    component.label = label;
    component.placeholder = placeholder;
    component.control = control;
    fixture.detectChanges();
  };

  const checkErrorMessage = (
    error: ValidationErrors,
    expectedMessage: string
  ) => {
    component.control.setErrors(error);
    fixture.detectChanges();
    expect(component.getError()).toBe(expectedMessage);
  };

  it('should create the component', () => {
    initializeComponent('Test Label', 'Test Placeholder', new FormControl(''));
    expect(component).toBeTruthy();
  });

  it('should display the correct label and placeholder', () => {
    initializeComponent('Name', 'Enter your name', new FormControl(''));
    const label = fixture.nativeElement.querySelector('mat-label');
    const input = fixture.nativeElement.querySelector('input');
    expect(label.textContent).toContain('Name');
    expect(input.placeholder).toBe('Enter your name');
  });

  it('should return required error message if control has required error', () => {
    initializeComponent('Email', '', new FormControl('', Validators.required));
    checkErrorMessage({ required: true }, 'Email is required');
  });

  it('should return whitespace error message if control has whitespace error', () => {
    initializeComponent('Name', '', new FormControl('', Validators.required));
    checkErrorMessage({ whitespace: true }, "Name shouldn't be empty");
  });

  it('should return invalid name error message if control has invalidName error', () => {
    initializeComponent('Name', '', new FormControl(''));
    checkErrorMessage(
      { invalidName: true },
      'Did you entered your name correctly?'
    );
  });

  it('should return email error message if control has email error', () => {
    initializeComponent(
      'Email',
      '',
      new FormControl('', [Validators.required, Validators.email])
    );
    checkErrorMessage({ email: true }, 'Email should be a email');
  });

  it('should return minlength error message if control has minlength error', () => {
    initializeComponent(
      'Password',
      '',
      new FormControl('', [Validators.required, Validators.minLength(8)])
    );
    checkErrorMessage(
      { minlength: { requiredLength: 8, actualLength: 4 } },
      'Password must have at least 8 chars'
    );
  });

  it('should return custom domain error message if control has invalidDomain error with message', () => {
    initializeComponent(
      'Website',
      '',
      new FormControl('', Validators.required)
    );
    checkErrorMessage(
      { invalidDomain: { message: 'Invalid domain' } },
      'Invalid domain'
    );
  });
});
