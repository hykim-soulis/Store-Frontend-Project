import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css'],
})
export class CheckoutFormComponent implements OnInit {
  fullName: string = '';
  address: string = '';
  creditCard: string = '';

  fullNameCheck: boolean | undefined;
  addressCheck: boolean | undefined;
  creditCardCheck: boolean | undefined;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
  // 나중에 업데이트 하기
  onClick() {
    this.cartService.updateOrderStatus().subscribe();
    this.cartService.createActiveOrder().subscribe();
  }

  onSubmitForm() {}

  checkFullName() {}

  checkAddress() {}

  checkCreditCardNumber($event: Event) {}

  checkCreditCard() {}

  onSubmitOrder(fullName: string, address: string, creditCard: string) {}
}
