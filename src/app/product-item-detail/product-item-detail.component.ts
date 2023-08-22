import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Product } from '../Models/product.model';
import { OrderProduct } from '../Models/CartItem.model';
import { ProductService } from '../products/product.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit, OnDestroy {
  item: Product;
  quantity: number = 1;
  isAuthenticated = false;
  userSub: Subscription | null = null;
  addEvent: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
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
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; // !user ? false : true
    });
    const id: number = Number(this.route.snapshot.paramMap.get('id')!);
    this.getProduct(id);
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

  immediateCloseModal() {
    this.addEvent = false;
  }

  timerCloseModal() {
    setTimeout(() => {
      this.addEvent = false;
    }, 3000);
  }

  addProductToCart(quantity: number, product_id: number) {
    // if logout redirect to auth
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
        this.addEvent = true;
        this.timerCloseModal();
      },
    });
  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
  }
}
