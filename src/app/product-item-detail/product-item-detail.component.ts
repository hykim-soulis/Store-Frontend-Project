import { Component, OnInit } from '@angular/core';
import { CartService, OrderProduct } from '../cart/cart.service';
import { CartItem } from '../Models/CartItem.model';
import { Product, ProductResult } from '../Models/product.model';
import { ProductService } from '../products/product.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  item: Product;
  quantity: number = 1;
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.item = {
      product_id: 1,
      name: '',
      price: 1,
      category: '',
      img_url: '',
      description: '',
    };
  }

  ngOnInit(): void {
    this.getProduct(this.productService.selectedProduct.product_id);
  }

  getProduct(product_id: number) {
    const productObs = this.productService.getProduct(product_id);
    productObs.subscribe({
      next: (res) => {
        this.item = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete get product');
      },
    });
  }

  addProductToCart(quantity: number, product_id: number) {
    this.cartService.getActiveOrder();
    const checkObs: Observable<OrderProduct> | undefined =
      this.cartService.getOrderProductById(product_id);
    checkObs.subscribe({
      next: (res) => {
        if (!res) {
          const addObs = this.cartService.addProductToCart(
            quantity,
            product_id
          );
          addObs.subscribe();
        } else {
          let newQuantity = res.quantity;
          const updateQuantityObs = this.cartService.updateQuantity(
            quantity + newQuantity,
            product_id
          );
          updateQuantityObs.subscribe();
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete checking');
      },
    });
  }
}
