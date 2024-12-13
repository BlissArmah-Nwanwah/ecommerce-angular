import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { PRODUCT_ACTIONS } from '../products.actions';
import { CommonModule } from '@angular/common';
import { CreateProductData } from '../../services/product-data';
import { CustomInputFieldComponent } from '../../auth/custom-input-field/custom-input-field.component';
import { isProductsLoading } from '../products.selectors';
import { ModalService } from '../../services/modal.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type controlNameType = 'title' | 'price' | 'description' | 'category';
@Component({
  selector: 'app-createproductmodal',
  standalone: true,
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    CustomInputFieldComponent,
  ],
  templateUrl: './createproductmodal.component.html',
  styleUrl: './createproductmodal.component.scss',
})
export class CreateproductmodalComponent implements OnInit {
  public productForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    price: ['', [Validators.required]],
    description: ['', [Validators.required]],
    category: ['', [Validators.required]],
  });
  public isLoading = this.store.selectSignal(isProductsLoading);
  public errorMessage = '';
  public isOpen = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private modalService: ModalService
  ) {
    this.modalService
      .getActiveModal()
      .pipe(takeUntilDestroyed())
      .subscribe(activeModal => {
        this.isOpen = activeModal === 'createProductModal';
      });
  }

  ngOnInit() {
    this.onCloseModal();
  }

  public getControl(controlName: controlNameType): FormControl {
    return this.productForm.get(controlName) as FormControl;
  }

  public formSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm
        .value as unknown as CreateProductData;
      this.store.dispatch(
        PRODUCT_ACTIONS.createProduct({ product: productData })
      );
    }
  }

  public onCloseModal(): void {
    this.modalService.closeModal();
  }
}
