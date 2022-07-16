import { Injectable } from '@angular/core';
import {products} from './products';
import {Observable, of} from 'rxjs';
import {Category} from './interfaces/category';
import {Product} from './interfaces/product';
import {HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpClient} from '@angular/common/http';

// @Injectable()
// export class YourInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req);
//   }
// }

export class LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductListService {
  BASE_URL = 'http://localhost:8000';
  product = products;

  constructor(private httpClient: HttpClient) { }

  getProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:8000/api/products/');
  }

  getCategoryProducts(category: Category): Observable<Product[]> {
    if(category.id === 1) {
      return this.httpClient.get<Product[]>('http://localhost:8000/api/products/');
    }
    return this.httpClient.get<Product[]>(`http://localhost:8000/api/categories/${category.id-1}/products/`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  sortByAsc(products: Product[]): Observable<Product[]> {
    products.sort((a, b) => {
      return a.price - b.price;
    });
    return of(products);
  }

  // tslint:disable-next-line: no-shadowed-variable
  sortByDesc(products: Product[]): Observable<Product[]> {
    products.sort((a, b) => {
      return b.price - a.price;
    });
    return of(products);
  }

  login(username, password): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.BASE_URL}/api/login/`, {
      username,
      password
    });
  }
}
