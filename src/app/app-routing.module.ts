import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RestaurantsComponent } from './restaurants/restaurants.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { SignupComponent } from './signup/signup.component';
import { VendorViewComponent } from './vendor-view/vendor-view.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { DeliveryViewComponent } from './delivery-view/delivery-view.component';

import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
  { path: 'res', component: RestaurantsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'menu/:id', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'vendor/home', component: VendorViewComponent, canActivate: [AuthGuard] },
  { path: 'customer/home', component: CustomerViewComponent, canActivate: [AuthGuard] },
  { path: 'delivery/home', component: DeliveryViewComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}