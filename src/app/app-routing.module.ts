import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductItemDetailComponent } from './product-item-detail/product-item-detail.component';
import { ProductsComponent } from './products/products.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'product', component: ProductsComponent },
  {
    path: 'product/:id',
    component: ProductItemDetailComponent,
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    component: CartComponent,
  },
  {
    path: 'order-confirm',
    canActivate: [AuthGuard],
    component: OrderConfirmComponent,
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
