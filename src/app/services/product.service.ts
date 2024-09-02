import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductData, cartProductData } from './product-data';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private selectedProductKey = 'selectedProduct';
  private productCountKey = 'productCount';
  private cartProductsKey = 'cartProducts';

  selectedProduct: ProductData | null = null;
  cartProducts: cartProductData[] = [];
  productCount: number = 0;
  activeButton: string = '';

  private apiurl = environment.apiUrl

  constructor(private http: HttpClient) {
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

  getProducts(): Observable<ProductData[]> {
    return this.http.get<ProductData[]>(this.apiurl);
  }

  getSelectedProduct(id: string): Observable<ProductData> {
    return this.http.get<ProductData>(`${this.apiurl}/${id}`);
  }

  createProduct(data: {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
  }): Observable<ProductData> {
    return this.http.post<ProductData>(`${this.apiurl}`, {
      ...data,
    });
  }

  setSelectedProduct(product: ProductData): void {
    this.selectedProduct = product;
    this.updateLocalStorage();
  }

  setSelectedProductToCart(product: cartProductData): void {
    const existingProductIndex = this.cartProducts.findIndex(
      (p) => p.id === product.id
    );
    if (existingProductIndex !== -1) {
      // Product already exists in the cart, increase count by one
      const existingProduct = this.cartProducts[existingProductIndex];
      const updatedProduct = {
        ...existingProduct,
        count: (existingProduct.count || 0) + 1,
      };
      this.cartProducts[existingProductIndex] = updatedProduct;
    } else {
      // Product does not exist in the cart, add it
      const newProduct = { ...product, count: 1 };
      this.cartProducts.push(newProduct);
      this.productCount += 1;
    }

    this.updateLocalStorage();
  }

  incrementProductCount(productId: string): void {
    this.updateProductCount(productId, 1);
  }

  decrementProductCount(productId: string): void {
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

  cartCount(count: number): void {
    this.productCount += count;
    localStorage.setItem(
      this.productCountKey,
      JSON.stringify(this.productCount)
    );
  }

  getCartProducts(): ProductData[] {
    return this.cartProducts;
  }

  removeProductFromCart(product: ProductData): void {
    const index = this.cartProducts.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.cartProducts.splice(index, 1);
      this.productCount--; // Decrease product count
      this.updateLocalStorage();
    }
  }

  setActiveButton(button: string): void {
    this.activeButton = button;
  }

  getActiveButton(): string {
    return this.activeButton;
  }
}
