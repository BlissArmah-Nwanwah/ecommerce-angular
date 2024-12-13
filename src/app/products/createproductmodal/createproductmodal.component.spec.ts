import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CreateproductmodalComponent } from './createproductmodal.component';
import { ProductService } from '../../services/product.service';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { PRODUCT_ACTIONS } from '../products.actions';

describe('CreateproductmodalComponent', () => {
  let component: CreateproductmodalComponent;
  let fixture: ComponentFixture<CreateproductmodalComponent>;
  let productServiceMock: any;
  let storeMock: any;

  beforeEach(() => {
    productServiceMock = {
      createProduct: jest.fn(),
    };

    storeMock = {
      dispatch: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [CreateproductmodalComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: productServiceMock },
        { provide: Store, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateproductmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form with required fields', () => {
    expect(component.productForm).toBeDefined();
    expect(component.productForm.controls['title']).toBeDefined();
    expect(component.productForm.controls['price']).toBeDefined();
    expect(component.productForm.controls['description']).toBeDefined();
    expect(component.productForm.controls['category']).toBeDefined();
  });

  it('should mark form as invalid when required fields are missing', () => {
    component.productForm.setValue({
      title: '',
      price: '',
      description: '',
      category: '',
    });
    expect(component.productForm.invalid).toBe(true);
  });

  it('should call ProductService.createProduct and dispatch action on valid form submission', () => {
    const formData = {
      title: 'Product Title',
      price: 100,
      description: 'Product Description',
      category: 'Category',
    };
    component.productForm.setValue(formData);
    productServiceMock.createProduct.mockReturnValue(of({}));

    component.formSubmit();

    expect(component.isLoading).toBe(true);
    expect(productServiceMock.createProduct).toHaveBeenCalledWith(formData);
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      PRODUCT_ACTIONS.createProduct()
    );
  });

  it('should handle error when ProductService.createProduct fails', () => {
    const formData = {
      title: 'Product Title',
      price: 100,
      description: 'Product Description',
      category: 'Category',
    };
    const errorResponse = { message: 'Failed to create product' };
    component.productForm.setValue(formData);
    productServiceMock.createProduct.mockReturnValue(
      throwError(() => errorResponse)
    );

    component.formSubmit();

    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe(errorResponse.message);
  });

  it('should emit closeModal event on onCloseModal call', () => {
    jest.spyOn(component.closeModal, 'emit');
    component.onCloseModal();

    expect(component.closeModal.emit).toHaveBeenCalled();
  });
});
