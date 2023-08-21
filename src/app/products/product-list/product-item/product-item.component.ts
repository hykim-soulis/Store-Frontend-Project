import { Component, Input, OnInit } from '@angular/core';
import { createPublicKey } from 'crypto';
import { CartService } from 'src/app/cart/cart.service';
import { CartItem } from 'src/app/Models/CartItem.model';
import { Product } from '../../../Models/product.model';
import { ProductService } from '../../product.service';
import { Observable, Subscription } from 'rxjs';
import { OrderProduct } from 'src/app/Models/CartItem.model';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() item: Product;
  quantity: number;
  addEvent: boolean = false;
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.item = {
      product_id: 1,
      name: '',
      price: 0,
      category: '',
      img_url: '',
      description: '',
    };
    this.quantity = 1;
  }

  ngOnInit(): void {}
  immediateCloseModal() {
    this.addEvent = false;
  }

  timerCloseModal() {
    setTimeout(() => {
      this.addEvent = false;
    }, 3000);
  }
  goToProductDetail(item: Product) {
    this.productService.selectedProduct = item;
  }

  addProductToCart(quantity: number, product_id: number) {
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
        this.addEvent = true;
        this.timerCloseModal();
      },
    });
  }
}
