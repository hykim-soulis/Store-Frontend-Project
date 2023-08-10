import { Injectable } from '@angular/core';
import { CartItem } from '../Models/CartItem.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

export interface OrderResponse {
  data: {
    order: Order[];
  };
  status: string;
}
export interface Order {
  order_id: number;
  status: string;
  user_id: number;
}
export interface OrderProduct {
  order_products_id: number;
  quantity: number;
  product_id: number;
  order_id: number;
}

export interface Cart {
  product_id: number;
  order_products_id: number;
  quantity: number;
  order_id: number;
  name: string;
  price: string;
  category: string;
  img_url: string;
  description: string;
}
export interface OrderProductResponse {
  status: string;
  result?: number;
  data: {
    order: OrderProduct;
    orders: Cart[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // cartList: CartItem[] = [];
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
    // tap 이든 map이든 사용해서 price를 string에서 number로 바꿔야함 일단은 타입을 number | string으로 뒀음
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

  // addToCart(item: CartItem) {
  //   const idList = this.cartList.map((el) => el.product_id);

  //   if (idList.indexOf(item.product_id) >= 0) {
  //     this.cartList[idList.indexOf(item.product_id)].quantity += item.quantity;
  //   } else {
  //     this.cartList.push(item);
  //   }

  //   return this.cartList;
  // }

  // getTotalPrice(): number {
  //   return this.cartList.length > 0
  //     ? Math.round(
  //         this.cartList
  //           .map((el) => Number(el.price) * el.quantity)
  //           .reduce((a, b) => a + b) * 100
  //       ) / 100
  //     : 0;
  // }

  // updateCart(item: CartItem) {
  //   const idList = this.cartList.map((el) => el.product_id);
  //   this.cartList[idList.indexOf(item.product_id)].quantity = item.quantity;
  //   this.totalPrice = this.getTotalPrice();
  // }

  // deleteItem(item: CartItem) {
  //   const index = this.cartList
  //     .map((el) => el.product_id)
  //     .indexOf(item.product_id);
  //   this.cartList.splice(index, 1);
  // }

  // clearCart() {
  //   this.cartList = [];
  //   return this.cartList;
  // }
}
