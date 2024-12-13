import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-custom-input-field',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './custom-input-field.component.html',
  styleUrl: './custom-input-field.component.scss',
})
export class CustomInputFieldComponent {
  @Input({ required: true }) public label!: string;
  @Input({ required: true }) public placeholder!: string;
  @Input() public type: 'text' | 'password' = 'text';
  @Input({ required: true }) public control!: FormControl;

  public getError() {
    const errors = this.control.errors;

    if (!errors) {
      return '';
    }

    const errorKeys = Object.keys(errors);

    for (const key of errorKeys) {
      return this.getErrorMessage(key);
    }

    return '';
  }

  private getErrorMessage(error: string) {
    switch (error) {
      case 'required':
        return `${this.label} is required`;
      case 'whitespace':
        return `${this.label} shouldn't be empty`;
      case 'invalidName':
        return 'Did you enter your name correctly?';
      case 'email':
        return `${this.label} should be a valid email`;
      case 'minlength':
        return `${this.label} must have at least ${this.control.errors?.[error].requiredLength} characters`;
      case 'passwordStrength':
        const errors = this.control.errors?.['passwordStrength'];
        return this.getPasswordStrengthErrorMessage(errors);
      default:
        return '';
    }
  }

  private getPasswordStrengthErrorMessage(errors: any): string {
    const messages: string[] = [];

    if (!errors.hasUpperCase) {
      messages.push('at least one uppercase letter');
    }
    if (!errors.hasLowerCase) {
      messages.push('at least one lowercase letter');
    }
    if (!errors.hasDigit) {
      messages.push('at least one digit');
    }
    if (!errors.hasSpecialChar) {
      messages.push('at least one special character');
    }
    if (!errors.minLength) {
      messages.push('at least 8 characters long');
    }

    return `Password must contain ${messages.join(', ')}.`;
  }
}
