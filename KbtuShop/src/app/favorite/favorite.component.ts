import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../favorite.service';
import { Product } from '../interfaces/product';
import { Favorite } from '../interfaces/favorite';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  favorite: Favorite[] = [];
  allProducts: Product[] = [];
  products: Product[] = [];
  favoriteId: number[] = [];

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.getFavorite();
  }

  getFavorite() {
    const a = this.favoriteService.getFavorite();
    a.subscribe(cat => {
      this.favorite = cat;
      this.getAllProduct();
    });
    // console.log(this.cart);
  }

  getAllProduct() {
    const a = this.favoriteService.getProduct();
    a.subscribe(cat => {
      this.allProducts = cat;
      this.getProduct();
    });
    // console.log(this.allProducts);
  }

  getProduct() {
    console.log(this.favorite);
    console.log(this.allProducts);
    console.log('Searching....');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.favorite.length; i++) {
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < this.allProducts.length; j++) {
        if (this.favorite[i].product === this.allProducts[j].id) {
          this.products.push(this.allProducts[j]);
          this.favoriteId.push(this.favorite[i].id);
          console.log('cart item was found');
        }
      }
    }
  }

  delete(id) {
    this.favoriteService.deleteFromFavorite(id).subscribe(() => console.log('deleted'));
  }
}
