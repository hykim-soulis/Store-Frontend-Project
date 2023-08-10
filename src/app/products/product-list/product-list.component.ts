import { Component, OnInit, OnChanges } from '@angular/core';
import { Product } from '../../Models/product.model';
import { ProductService } from '../product.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productObservable$: Observable<Product[]> | null = null;
  category: string = 'All';
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getCategory() {
    this.category = this.productService.selectedCategory;
  }
  getAllProducts() {
    this.productObservable$ = this.productService.getAllProducts();
  }
  // getAllProductsByCategory() {
  //   this.productObservable$ = this.productService.getAllProductsByCategory();
  // }
}
