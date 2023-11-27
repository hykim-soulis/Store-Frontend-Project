import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Observable, switchMap, tap } from 'rxjs';
import { Cart } from '../Models/CartItem.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartObservable$: Observable<Cart[]> | null = null;
  totalPrice: number = 0;
  items: Cart[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getAllCartItems();
  }

  onClickProceed() {
    this.cartService.postToStripe(this.items).subscribe();
    this.cartService.updateOrderStatus().subscribe();
    this.cartService.createActiveOrder().subscribe();
  }

  getAllCartItems() {
    this.cartObservable$ = this.cartService.getActiveOrder().pipe(
      switchMap((id) => this.cartService.getAllCartItems(id)),
      tap((items) => {
        this.items = items;
        this.getTotalPrice(items);
      })
    );
  }

  getTotalPrice(cartList: Cart[]) {
    let sum = 0;
    cartList.forEach((i) => {
      sum += Number(i.price) * i.quantity;
    });
    this.totalPrice = sum;
  }

  updateTotalPrice() {
    this.cartObservable$?.subscribe({
      next: (items) => {
        this.getTotalPrice(items);
      },
    });
  }

  deleteItem() {
    this.cartObservable$?.subscribe({
      next: () => this.getAllCartItems(),
    });
  }
}
