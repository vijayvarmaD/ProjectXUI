import { Component, OnInit, Inject } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Service & Components
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductsService } from '../_services/products.service';
import { UtilityService } from '../_services/utility.service';
import { CommService } from '../_services/comm.service';

@Component({
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    walletBalance: Number;
    orderStateArray: String[] = [ 'PRE-SUBMIT', 'SUBMIT', 'POST-SUBMIT' ];
    orderState: String = this.orderStateArray[0];
    step = 0;
    addressDecription = 'Enter your address';
    carterData: any;
    cartAmount: Number;
    totalQuantity: Number = 0;
    vendorId: string;
    spinnerData: any;

    constructor(
        private productsService: ProductsService,
        private _formBuilder: FormBuilder,
        private utilityService: UtilityService,
        private comms: CommService
    ) { }

    ngOnInit() {
        // Update Navbar - User logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        NavbarComponent.updateUserStatus.next(true);

        // Retrieve cart from local local storage
        const cartData = JSON.parse(localStorage.getItem('customerCartData'));

        // Services
        this.utilityService.getWalletBalance().subscribe(walletBalance => {
            this.walletBalance = walletBalance.balance;
        });

        // Set values
        this.cartAmount = cartData.totalAmount;
        this.vendorId = cartData.vendor;
        this.carterData = cartData.cart;
        let tq = 0;
        cartData.cart.forEach(element => {
            tq += element.quantity;
        });
        this.totalQuantity = tq;

        // Stepper
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: [{ value: true }]
        });

        // address form value change
        this.firstFormGroup.get('firstCtrl').valueChanges.debounceTime(2000).subscribe(value => {
            if (this.firstFormGroup.get('firstCtrl').value !== null) {
                this.orderState = this.orderStateArray[1];
            }
        });
        this.spinnerData = [
            { attr: 'Payment', status: 'complete', icon: 'payment' },
            { attr: 'Dispatched', status: 'spin', icon: 'local_shipping' },
            { attr: 'Order Recieved', status: 'spin', icon: 'home' },
        ];
    }

    orderSubmit() {
        const orderSubmitDetails = { totalAmount: null, vendor: null, cart: [] };
        orderSubmitDetails.totalAmount = this.cartAmount;
        orderSubmitDetails.vendor = this.vendorId;
        this.carterData.forEach(element => {
            orderSubmitDetails.cart.push({ productId: element._id, quantity: element.quantity  });
        });
        this.productsService.submitOrder(orderSubmitDetails).subscribe(result => {
            if (result.success) {
                this.orderState = this.orderStateArray[2];
            } else {
                console.log(result);
            }
        });
        this.comms.getMessages().subscribe(msg => {
            console.log(msg);
        });
    }

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        // Change order state after Payment Next click
        if (this.step === 2) {
            // this.orderState = this.orderStateArray[1];
        }
        // Change address description after address next click
        if (this.step === 0) {
            if (this.firstFormGroup.get('firstCtrl').value !== '') {
                this.addressDecription = this.firstFormGroup.get('firstCtrl').value;
            }
        }
        this.step++;
    }

    prevStep() {
        this.step--;
    }
}
