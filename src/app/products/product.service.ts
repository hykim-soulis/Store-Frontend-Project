import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Product,
  ProductsResult,
  ProductResult,
} from '../Models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  selectedProduct: Product;
  selectedCategory: string;

  constructor(private http: HttpClient) {
    this.selectedProduct = {
      product_id: 1,
      name: '',
      price: 0,
      category: '',
      img_url: '',
      description: '',
    };
    this.selectedCategory = 'All';
  }

  getAllProducts() {
    return this.http
      .get<ProductsResult>(
        `http://127.0.0.1:8000/product?category=${this.selectedCategory}`
      )
      .pipe(map((res) => [...res['data']['products']]));
  }
  // getAllProductsByCategory() {
  //   return this.http
  //     .get<ProductsResult>(
  //       `http://127.0.0.1:8000/product?category=${this.selectedCategory}`
  //     )
  //     .pipe(map((res) => [...res['data']['products']]));
  // }

  getProduct(product_id: number) {
    return this.http
      .get<ProductResult>(`http://127.0.0.1:8000/product/${product_id}`)
      .pipe(map((res) => res['data']['product']));
  }

  getCategories() {
    return this.http.get<ProductsResult>('http://127.0.0.1:8000/product/').pipe(
      map((res) => {
        let categoriesSet = new Set<string>();
        for (const product of res['data']['products']) {
          if (!categoriesSet.has(product.category))
            categoriesSet.add(product.category);
        }
        let categories: string[] = ['All'];
        for (const entry of categoriesSet) categories.push(entry);
        return categories;
      })
    );
  }
}
