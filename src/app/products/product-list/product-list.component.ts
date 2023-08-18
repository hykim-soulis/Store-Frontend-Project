import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Product } from '../../Models/product.model';
import { ProductService } from '../product.service';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productObservable$: Observable<Product[]> | null = null;

  private _category: string = 'All';
  @Input()
  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
    this.getAllProducts();
  }
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productObservable$ = this.productService.getAllProducts(this.category);
  }
}
