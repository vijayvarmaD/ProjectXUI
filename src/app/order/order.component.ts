import { Component, OnInit, Inject } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavbarComponent } from '../navbar/navbar.component';
import { ProductsService } from '../_services/products.service';

@Component({
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    checked = false;
    walletBalance: Number;

    constructor(
        private productsService: ProductsService,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        // Update Navbar - User logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        NavbarComponent.updateUserStatus.next(true);

        // Retrieve cart from local local storage
        const cartData = JSON.parse(localStorage.getItem('customerCartData'));

        // Set values
        this.walletBalance = cartData.totalAmount;

        // Stepper
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: [true]
        });
    }

    orderSubmit() {
        
    }
}