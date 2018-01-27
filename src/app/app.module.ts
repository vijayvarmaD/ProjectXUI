import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { RestaurantsComponent, ClearCartDataConfirmDialogComponent } from './restaurants/restaurants.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { VendorViewComponent } from './vendor-view/vendor-view.component';
import { DeliveryViewComponent } from './delivery-view/delivery-view.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { SignupComponent } from './signup/signup.component';
import {
  VendorMenuComponent,
  VendorProductDeleteConfirmDialog,
  VendorProductEditFormDialog
} from './vendor-view/vendor-menu/vendor-menu.component';
import { VendorAddProductComponent } from './vendor-view/vendor-add-product/vendor-add-product.component';
import { OrderComponent } from './order/order.component';
import { VendorOrdersComponent } from './vendor-view/vendor-orders/vendor-orders.component';

import { AuthGuard } from './_guards/auth.guard';
import { OrderGuard } from './_guards/order.guard';
import { AuthenticationService } from './_services/authentication.service';
import { ProductsService } from './_services/products.service';
import { ViewsService } from './_services/views.service';
import { UtilityService } from './_services/utility.service';
import { CommService } from './_services/comm.service';
import { AlertHelper } from './_helpers/alert.helper';
import { GlobalHelper } from './_helpers/global.helper';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    VendorViewComponent,
    DeliveryViewComponent,
    CustomerViewComponent,
    SignupComponent,
    VendorMenuComponent,
    VendorAddProductComponent,
    VendorProductDeleteConfirmDialog,
    VendorProductEditFormDialog,
    ClearCartDataConfirmDialogComponent,
    OrderComponent,
    VendorOrdersComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ VendorProductDeleteConfirmDialog, VendorProductEditFormDialog, ClearCartDataConfirmDialogComponent ],
  providers: [
    ProductsService,
    AuthenticationService,
    AuthGuard,
    ViewsService,
    OrderGuard,
    UtilityService,
    CommService,
    AlertHelper,
    GlobalHelper
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
