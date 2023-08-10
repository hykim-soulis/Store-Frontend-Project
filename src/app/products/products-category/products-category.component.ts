import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.css'],
})
export class ProductsCategoryComponent implements OnInit {
  @Output() selectCategory: EventEmitter<string> = new EventEmitter();
  categoryObservable$: Observable<string[]> | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryObservable$ = this.productService.getCategories();
  }

  onSelectCategory(category: string) {
    this.productService.selectedCategory = category;
    console.log('category select', category);
    this.selectCategory.emit(category);
  }
}
