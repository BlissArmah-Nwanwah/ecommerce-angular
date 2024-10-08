import { ProductService } from './../../services/product.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { AppState } from '../../app.state';
import { PRODUCT_ACTIONS } from '../products.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createproductmodal',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './createproductmodal.component.html',
  styleUrl: './createproductmodal.component.scss',
})
export class CreateproductmodalComponent implements OnInit {
  public productForm!: FormGroup;
  public isLoading = false;
  public errorMessage = '';
  @Output() public closeModal = new EventEmitter();

   constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private store: Store<AppState>
  ) {}
   ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: [[Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  public formSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      const authObs = this.productService.createProduct(formData);
      this.isLoading = true;

      authObs
        .pipe(
          tap(() => {
            this.store.dispatch(PRODUCT_ACTIONS.createProduct());
          })
        )
        .subscribe({
          next: () => {
            this.isLoading = true;
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = error.message;
          },
        });
    }
  }

  public onCloseModal(): void {
    this.closeModal.emit();
  }
}
