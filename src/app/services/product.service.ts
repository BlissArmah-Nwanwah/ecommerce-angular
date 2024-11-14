import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {CreateProductData, ProductData} from './product-data';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {


  private readonly apiurl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {
  }

  public getProducts(): Observable<ProductData[]> {
    return this.http.get<ProductData[]>(this.apiurl).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  public getSelectedProduct(id: string): Observable<ProductData> {
    return this.http.get<ProductData>(`${this.apiurl}/${id}`);
  }

  public createProduct(
    data: CreateProductData
  ): Observable<ProductData[]> {
    return this.http.post<ProductData[]>(`${this.apiurl}`, {
      ...data,
    });
  }

}
