import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { AuthService } from './auth.service';
import { AuthResponseData } from '../Models/Auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      const firstName = form.value.firstName;
      const lastName = form.value.lastName;
      authObs = this.authService.signup(firstName, lastName, email, password);
    }

    authObs.subscribe({
      next: (resData) => {
        this.errorMessage = '';
        this.router.navigate(['/product']);
      },
      error: (error) => {
        this.errorMessage = error.error.errorMessage;
        console.log(error);
      },
      complete: () => {
        if (!this.isLoginMode) {
          this.cartService.createActiveOrder().subscribe();
        }
      },
    });

    form.reset();
  }

  onSwitchMode() {
    this.errorMessage = '';
    this.isLoginMode = !this.isLoginMode;
  }
}
