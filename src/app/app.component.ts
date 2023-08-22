import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSub: Subscription | null = null;
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; // !user ? false : true
      if (this.isAuthenticated) this.cartService.getActiveOrder().subscribe();
    });
  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
  }
}
