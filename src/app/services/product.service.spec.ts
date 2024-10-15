import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ProductService} from './product.service';
import {LocalStorageService} from './localstorage.service';
import {ProductData, CartProductData} from './product-data';
import {environment} from '../../environments/environment';
import {of} from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  let localStorageService: jest.Mocked<LocalStorageService>;

  const mockProducts: ProductData[] = [
    {
      id: '1',
      title: 'Product 1',
      price: '100',
      description: 'Description 1',
      category: 'Category 1',
      image: '',
      rating: {
        rate: 2,
        count: 4
      }
    },
    {
      id: '2', title: 'Product 2', price: '200', description: 'Description 2', category: 'Category 2', image: '',
      rating: {
        rate: 2,
        count: 4
      }
    },
  ];

  beforeEach(() => {
    localStorageService = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    } as jest.Mocked<LocalStorageService>;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        {provide: LocalStorageService, useValue: localStorageService},
      ],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load product data from local storage', () => {
    const cartProducts: CartProductData[] = [
      {
        id: '1',
        title: 'Product 1',
        price: '100',
        description: 'Description 1',
        category: 'Category 1',
        count: 1,
        image: '',
        rating: {
          rate: 2,
          count: 4
        }
      },
    ];

    localStorageService.getItem.mockReturnValueOnce(cartProducts);

    service['loadFromLocalStorage']();

    expect(localStorageService.getItem).toHaveBeenCalledWith(service['cartProductsKey']);
    expect(service.cartProducts).toEqual(cartProducts);
  });

  it('should return an array of products', () => {
    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should return products matching the search term', () => {
    jest.spyOn(service, 'getProducts').mockReturnValue(of(mockProducts));

    service.searchProducts('Product 1').subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products[0].title).toContain('Product 1');
    });
  });

  it('should add a new product to the cart and update local storage', () => {
    const cartProduct: CartProductData = {
      id: '1',
      title: 'Product 1',
      price: '100',
      description: 'Description 1',
      category: 'Category 1',
      count: 1,
      image: '',
      rating: {
        rate: 2,
        count: 4
      }
    };

    service.setSelectedProductToCart(cartProduct);

    expect(service.cartProducts.length).toBe(1);
    expect(service.cartProducts[0].count).toBe(1);
    expect(localStorageService.setItem).toHaveBeenCalledWith(service['cartProductsKey'], service.cartProducts);
  });

  it('should increment the count if the product already exists in the cart', () => {
    const cartProduct: CartProductData = {
      id: '1',
      title: 'Product 1',
      price: '100',
      description: 'Description 1',
      category: 'Category 1',
      count: 1,
      image: '',
      rating: {
        rate: 2,
        count: 4
      }
    };

    service.cartProducts = [cartProduct];

    service.setSelectedProductToCart(cartProduct);

    expect(service.cartProducts.length).toBe(1);
    expect(service.cartProducts[0].count).toBe(2);
    expect(localStorageService.setItem).toHaveBeenCalledWith(service['cartProductsKey'], service.cartProducts);
  });

  it('should increase the product count and update local storage', () => {
    const cartProduct: CartProductData = {
      id: '1',
      title: 'Product 1',
      price: '100',
      description: 'Description 1',
      category: 'Category 1',
      count: 1,
      image: '',
      rating: {
        rate: 2,
        count: 4
      }
    };

    service.cartProducts = [cartProduct];

    service.incrementProductCount('1');

    expect(service.cartProducts[0].count).toBe(2);
    expect(localStorageService.setItem).toHaveBeenCalledWith(service['cartProductsKey'], service.cartProducts);
  });

  it('should decrease the product count and remove from cart if count is 0', () => {
    const cartProduct: CartProductData = {
      id: '1',
      title: 'Product 1',
      price: '100',
      description: 'Description 1',
      category: 'Category 1',
      count: 1,
      image: '',
      rating: {
        rate: 2,
        count: 4
      }
    };

    service.cartProducts = [cartProduct];

    service.decrementProductCount('1');

    expect(service.cartProducts.length).toBe(0);
    expect(localStorageService.setItem).toHaveBeenCalledWith(service['cartProductsKey'], service.cartProducts);
  });

  it('should remove the product from the cart and update local storage', () => {
    const cartProduct: CartProductData = {
      id: '1',
      title: 'Product 1',
      price: '100',
      description: 'Description 1',
      category: 'Category 1',
      count: 1,
      image: '',
      rating: {
        rate: 2,
        count: 4
      }
    };

    service.cartProducts = [cartProduct];

    service.removeProductFromCart(cartProduct);

    expect(service.cartProducts.length).toBe(0);
    expect(localStorageService.setItem).toHaveBeenCalledWith(service['cartProductsKey'], service.cartProducts);
  });
});
