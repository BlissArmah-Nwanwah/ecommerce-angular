import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { LocalStorageService } from './localstorage.service';
import { environment } from '../../environments/environment';
import {mockProducts} from "../utils/utils";


describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  let localStorageService: jest.Mocked<LocalStorageService>;

  beforeEach(() => {
    localStorageService = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    } as unknown as jest.Mocked<LocalStorageService>;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        { provide: LocalStorageService, useValue: localStorageService },
      ],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return an array of products', () => {
    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

});
