import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddToCartModalComponent } from './add-to-cart-modal/add-to-cart-modal.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductItemDetailComponent } from './product-item-detail/product-item-detail.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'product', component: ProductsComponent },
  {
    path: 'product/:id',

    component: ProductItemDetailComponent,
  },
  {
    path: 'addToCart',

    component: AddToCartModalComponent,
  },
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
