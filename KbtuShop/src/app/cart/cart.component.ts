import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../interfaces/product';
import { Cart } from '../interfaces/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart[] = [];
  allProducts: Product[] = [];
  products: Product[] = [];
  cartId: number[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    const a = this.cartService.getCart();
    a.subscribe(cat => {
      this.cart = cat;
      this.getAllProduct();
    });
    // console.log(this.cart);
  }

  getAllProduct() {
    const a = this.cartService.getProduct();
    a.subscribe(cat => {
      this.allProducts = cat;
      this.getProduct();
    });
    // console.log(this.allProducts);
  }

  getProduct() {
    console.log(this.cart);
    console.log(this.allProducts);
    console.log('Searching....');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.cart.length; i++) {
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < this.allProducts.length; j++) {
        if (this.cart[i].product === this.allProducts[j].id) {
          this.products.push(this.allProducts[j]);
          this.cartId.push(this.cart[i].id);
          console.log('cart item was found');
        }
      }
    }
  }

  delete(id) {
    this.cartService.deleteFromCart(id).subscribe(() => console.log('deleted'));
  }

  // removeItem(name) {
  //   for ( let i = 0; i < this.items.length; i++) {
  //     if( this.items[i].name === name )
  //       this.items.splice(i--, 1);
  //   }
  // }

}
