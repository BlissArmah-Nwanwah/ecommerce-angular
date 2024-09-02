import { ProductService } from './../../services/product.service';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, output, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from '../../app.state';
import { PRODUCT_ACTIONS } from '../products.actions';

@Component({
  selector: 'app-createproductmodal',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './createproductmodal.component.html',
  styleUrl: './createproductmodal.component.scss',
})
export class CreateproductmodalComponent implements OnInit {
  productForm!: FormGroup;
  public isLoading = false;
  public errorMessage = '';
  @Output() closeModal = new EventEmitter();
  @ViewChild('modalContent') modalContent!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: [0, [Validators.required]],
      description: ['', [Validators.required]],
      image: [''],
      category: ['', [Validators.required]],
    });
  }
  formSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      let authObs: Observable<any>;
      authObs = this.productService.createProduct(formData);

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
  
  // @HostListener('click', ['$event'])
  // onClick() {
  //     this.closeModal.emit();
  // }
  onCloseModal(): void {
    console.log('clicked');
    this.closeModal.emit();
  }

  modalClose(){
    console.log('Overlay clicked');
  }
}
