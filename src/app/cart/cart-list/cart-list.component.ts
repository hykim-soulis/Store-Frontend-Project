import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/Models/CartItem.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  @Input() item: CartItem;
  @Output() updateItemQuantity: EventEmitter<CartItem> = new EventEmitter();
  @Output() deleteItemFromCart: EventEmitter<CartItem> = new EventEmitter();

  constructor(private cartService: CartService) {
    this.item = {
      product_id: 1,
      order_products_id: 1,
      quantity: 1,
      order_id: 1,
      name: '',
      price: 1,
      category: '',
      img_url: '',
      description: '',
    };
  }
  ngOnInit(): void {}

  onUpdate(item: CartItem) {
    this.cartService.updateQuantity(item.quantity, item.product_id).subscribe();
    this.updateItemQuantity.emit();
  }

  onDelete(item: CartItem) {
    this.cartService.deleteItem(item.product_id).subscribe();
    this.deleteItemFromCart.emit(item);
  }
}
