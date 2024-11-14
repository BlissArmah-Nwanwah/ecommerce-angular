import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.value;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const minLength = password?.length >= 8;

  const valid = hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && minLength;

  if (!valid) {
    return {
      passwordStrength: {
        hasUpperCase,
        hasLowerCase,
        hasDigit,
        hasSpecialChar,
        minLength,
      },
    };
  }

  return null;
}
