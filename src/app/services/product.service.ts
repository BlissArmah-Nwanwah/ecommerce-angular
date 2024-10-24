import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { ProductData, CartProductData } from './product-data';
import { environment } from '../../environments/environment';
import {LocalStorageService} from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private selectedProductKey = 'selectedProduct';
  private productCountKey = 'productCount';
  private cartProductsKey = 'cartProducts';

  public selectedProduct: ProductData | null = null;
  public cartProducts: CartProductData[] = [];
  public productCount = 0;

  private apiurl = environment.apiUrl;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    this.selectedProduct = this.localStorageService.getItem<ProductData>(this.selectedProductKey);
    this.cartProducts = this.localStorageService.getItem<CartProductData[]>(this.cartProductsKey) || [];
    this.productCount = this.localStorageService.getItem<number>(this.productCountKey) || 0;
  }

  private updateLocalStorage(): void {
    this.localStorageService.setItem(this.selectedProductKey, this.selectedProduct);
    this.localStorageService.setItem(this.cartProductsKey, this.cartProducts);
    this.localStorageService.setItem(this.productCountKey, this.productCount);
  }

  public getProducts(): Observable<ProductData[]> {
    return this.http.get<ProductData[]>(this.apiurl).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  public searchProducts(searchTerm: string): Observable<ProductData[]> {
    return this.getProducts().pipe(
      map((products) =>
        products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  public getSelectedProduct(id: string): Observable<ProductData> {
    return this.http.get<ProductData>(`${this.apiurl}/${id}`);
  }

  public createProduct(data: {
    title: string;
    price: number;
    description: string;
    category: string;
  }): Observable<ProductData> {
    return this.http.post<ProductData>(`${this.apiurl}`, {
      ...data,
    });
  }

  public setSelectedProductToCart(product: CartProductData): void {
    const existingProductIndex = this.cartProducts.findIndex(
      (p) => p.id === product.id
    );
    if (existingProductIndex !== -1) {
      const existingProduct = this.cartProducts[existingProductIndex];
      const updatedProduct = {
        ...existingProduct,
        count: (existingProduct.count ?? 0) + 1,
      };
      this.cartProducts[existingProductIndex] = updatedProduct;
    } else {
      const newProduct = { ...product, count: 1 };
      this.cartProducts.push(newProduct);
      this.productCount += 1;
    }

    this.updateLocalStorage();
  }

  public incrementProductCount(productId: string): void {
    this.updateProductCount(productId, 1);
  }

  public decrementProductCount(productId: string): void {
    this.updateProductCount(productId, -1);
  }

  private updateProductCount(productId: string, countChange: number): void {
    const index = this.cartProducts.findIndex((p) => p.id === productId);

    if (index !== -1) {
      const newCount = (this.cartProducts[index].count || 0) + countChange;

      if (newCount <= 0) {
        this.cartProducts.splice(index, 1);
        this.productCount--;
      } else {
        const updatedProduct = { ...this.cartProducts[index], count: newCount };
        this.cartProducts[index] = updatedProduct;
      }

      this.updateLocalStorage();
    }
  }


  public getCartProducts(): ProductData[] {
    return this.cartProducts;
  }

  public removeProductFromCart(product: ProductData): void {
    const index = this.cartProducts.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.cartProducts.splice(index, 1);
      this.productCount--; // Decrease product count
      this.updateLocalStorage();
    }
  }
}
