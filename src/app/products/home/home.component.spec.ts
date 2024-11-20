import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { SnackbarService } from '../../services/snackbar.service';
import { ModalService } from '../../services/modal.service';
import { PRODUCT_ACTIONS } from '../products.actions';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import {of} from "rxjs";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockSnackbarService: jest.Mocked<SnackbarService>;
  let mockModalService: jest.Mocked<ModalService>;
  let mockRouter: jest.Mocked<Router>;

  const initialState = {
    goods: {
      isLoading: false,
      products: [
        { id: 1, title: 'Product 1', price: 100 },
        { id: 2, title: 'Product 2', price: 200 },
      ],
      cartProducts: [],
    },
  };

  beforeEach(async () => {
    mockSnackbarService = {
      openSnackBar: jest.fn(),
    } as unknown as jest.Mocked<SnackbarService>;

    mockModalService = {
      openModal: jest.fn(),
      getActiveModal: jest.fn().mockReturnValue(of('createProductModal')),
    } as unknown as jest.Mocked<ModalService>;

    mockRouter = {
      navigateByUrl: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    const mockActivatedRoute = {
      snapshot: { params: {} },
      queryParams: of({}),
    } as unknown as ActivatedRoute;
    await TestBed.configureTestingModule({
      imports: [HomeComponent,RouterTestingModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: SnackbarService, useValue: mockSnackbarService },
        { provide: ModalService, useValue: mockModalService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProduct on init', () => {
    const dispatchSpy = jest.spyOn(component['store'], 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(PRODUCT_ACTIONS.loadProduct());
  });

  it('should filter products based on search term', () => {
    component.searchTerm.set('Product 1');
    const filtered = component.filteredProducts();
    expect(filtered).toEqual([{ id: 1, title: 'Product 1', price: 100 }]);
  });

  it('should open the create product modal', () => {
    component.onToggleCreatProductModal();
    expect(mockModalService.openModal).toHaveBeenCalledWith('createProductModal');
  });

  it('should navigate to product details on product detail action', () => {
    component.onProductSelectDetail({
      id: '1',
      title: 'Product 1',
      price: '100',
      description: 'Description 1',
      category: 'Category 1',
      count: 1,
      image: '',
      rating: {
        rate: 2,
        count: 4,
      },},);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/details/1');
  });

  it('should add product to cart and show snackbar on add to cart action', () => {
    const dispatchSpy = jest.spyOn(component['store'], 'dispatch');
    component.onProductSelectedToCart({
      id: '1',
      title: 'Product 1',
      price: '100',
      description: 'Description 1',
      category: 'Category 1',
      count: 1,
      image: '',
      rating: {
        rate: 2,
        count: 4,
      },},);
    expect(dispatchSpy).toHaveBeenCalledWith(
      PRODUCT_ACTIONS.addProductToCart({ product: {
          id: '1',
          title: 'Product 1',
          price: '100',
          description: 'Description 1',
          category: 'Category 1',
          count: 1,
          image: '',
          rating: {
            rate: 2,
            count: 4,
          },}, })
    );
    expect(mockSnackbarService.openSnackBar).toHaveBeenCalledWith('Item added to cart', 'Close');
  });
});
