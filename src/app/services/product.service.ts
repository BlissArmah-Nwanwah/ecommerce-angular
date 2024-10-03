import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { ProductData, CartProductData } from './product-data';
import { environment } from '../../environments/environment';

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
  public activeButton = '';

  private apiurl = environment.apiUrl;

  public constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedProduct = localStorage.getItem(this.selectedProductKey);
    if (storedProduct) {
      this.selectedProduct = JSON.parse(storedProduct);
    }

    const storedCartProducts = localStorage.getItem(this.cartProductsKey);
    if (storedCartProducts) {
      this.cartProducts = JSON.parse(storedCartProducts);
    }

    const storedProductCount = localStorage.getItem(this.productCountKey);
    if (storedProductCount) {
      this.productCount = JSON.parse(storedProductCount);
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem(
      this.selectedProductKey,
      JSON.stringify(this.selectedProduct)
    );
    localStorage.setItem(
      this.cartProductsKey,
      JSON.stringify(this.cartProducts)
    );
    localStorage.setItem(
      this.productCountKey,
      JSON.stringify(this.productCount)
    );
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

  public setSelectedProduct(product: ProductData): void {
    this.selectedProduct = product;
    this.updateLocalStorage();
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

  public cartCount(count: number): void {
    this.productCount += count;
    localStorage.setItem(
      this.productCountKey,
      JSON.stringify(this.productCount)
    );
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

  public setActiveButton(button: string): void {
    this.activeButton = button;
  }
  public getActiveButton(): string {
    return this.activeButton;
  }
}
