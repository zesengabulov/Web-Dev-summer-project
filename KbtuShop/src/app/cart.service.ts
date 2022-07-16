import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from './interfaces/product';
import { Cart } from './interfaces/cart';
import { ProductListService } from './product-list.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any = [];
  products: Product[] = [];

  constructor(private httpClient: HttpClient, private productListService: ProductListService) { }

  getCart(): Observable<Cart[]> {
    return this.httpClient.get<Cart[]>('http://localhost:8000/api/cart/');
  }

  getProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:8000/api/products/');
  }

  addToCart(product: Product) {
    this.items.push(product);
  }

  deleteFromCart(id: number): Observable<void> {
    console.log(id, 'was deleted');
    return this.httpClient.delete<void>(`http://localhost:8000/api/cart/${id}`);
  }
}
