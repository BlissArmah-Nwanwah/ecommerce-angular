import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-custom-input-field',
  standalone: true,
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,],
  templateUrl: './custom-input-field.component.html',
  styleUrl: './custom-input-field.component.scss'
})
export class CustomInputFieldComponent {
  @Input({required: true}) public label!: string;
  @Input({required: true}) public placeholder!: string;
  @Input() public type = 'text';
  @Input({required: true}) public control!: FormControl;

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
        return 'Did you entered your name correctly?';
      case 'email':
        return `${this.label} should be a email`;
      case 'invalidDomain':
        return `${this.control.errors?.[error].message}`;
      case 'minlength':
        return `${this.label} must have at least ${this.control.errors?.[error].requiredLength} chars`;
      default:
        return '';
    }
  }
}
