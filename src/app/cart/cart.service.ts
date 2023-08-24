import { Injectable } from '@angular/core';
import {
  OrderResponse,
  OrderProductResponse,
  Cart,
} from '../Models/CartItem.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  totalPrice: number = 0;
  cartId: number | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getActiveOrder() {
    const authHeader = this.authService.getToken();
    return this.http
      .get<OrderResponse>(
        `http://127.0.0.1:8000/order/status/active`,
        authHeader
      )
      .pipe(
        map((res) => {
          this.cartId = res.data.order[0]['order_id'];
          return this.cartId;
        })
      );
  }
  getAllCompleteOrder() {
    const authHeader = this.authService.getToken();
    return this.http
      .get<OrderResponse>(
        `http://127.0.0.1:8000/order/status/complete`,
        authHeader
      )
      .pipe(map((res) => res['data']['order']));
  }

  createActiveOrder() {
    const authHeader = this.authService.getToken();
    return this.http
      .post<OrderResponse>(
        `http://127.0.0.1:8000/order`,
        { status: 'active' },
        authHeader
      )
      .pipe(map((res) => res.data.order[0].order_id));
  }

  updateOrderStatus() {
    const authHeader = this.authService.getToken();
    return this.http
      .put<OrderResponse>(
        `http://127.0.0.1:8000/order/${this.cartId}`,
        { status: 'complete' },
        authHeader
      )
      .pipe(map((res) => res));
  }

  getOrderProductById(product_id: number) {
    const authHeader = this.authService.getToken();
    return this.http
      .get<OrderProductResponse>(
        `http://127.0.0.1:8000/order/${this.cartId}/products/${product_id}`,
        authHeader
      )
      .pipe(map((res) => res.data.order));
  }

  addProductToCart(quantity: number, product_id: number) {
    const authHeader = this.authService.getToken();
    return this.http
      .post<OrderProductResponse>(
        `http://127.0.0.1:8000/order/${this.cartId}/products`,
        { quantity: quantity, product_id: product_id },
        authHeader
      )
      .pipe(map((res) => res['data']['order']));
  }

  updateQuantity(quantity: number, product_id: number) {
    const authHeader = this.authService.getToken();
    return this.http
      .put<OrderProductResponse>(
        `http://127.0.0.1:8000/order/${this.cartId}/products/${product_id}`,
        { quantity: quantity },
        authHeader
      )
      .pipe(map((res) => res['data']['order']));
  }

  getAllCartItems(id: number | null) {
    const authHeader = this.authService.getToken();
    return this.http
      .get<OrderProductResponse>(
        `http://127.0.0.1:8000/order/${id}/products`,
        authHeader
      )
      .pipe(map((res) => res['data']['orders']));
  }

  deleteItem(product_id: number) {
    const authHeader = this.authService.getToken();
    return this.http
      .delete<OrderProductResponse>(
        `http://127.0.0.1:8000/order/${this.cartId}/products/${product_id}`,
        authHeader
      )
      .pipe(map((res) => res['data']['order']));
  }

  postToStripe(items: Cart[]) {
    const authHeader = this.authService.getToken();
    const options = {
      headers: {
        Accept: 'application/json',
        ...authHeader.headers,
      },
    };
    return this.http
      .post<{ status: string; url: string }>(
        `http://127.0.0.1:8000/order/${this.cartId}/checkout-session`,
        { items: [...items] },
        options
      )
      .pipe(
        tap((x) => {
          window.location.assign(x.url);
        })
      );
  }
}
