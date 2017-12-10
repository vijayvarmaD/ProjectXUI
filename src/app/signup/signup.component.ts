import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators, NgForm } from '@angular/forms';

import { AuthenticationService } from '../_services/authentication.service';
const vehicleNumberRegex = /^[A-Z]{2}[ ][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;


@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
    model: any = {};
    hide = true;
    serverError = '';

    myControl: FormControl = new FormControl();
    options = [
        { value: 'CUSTOMER', viewValue: 'Customer' },
        { value: 'VENDOR', viewValue: 'Vendor' },
        { value: 'DELIVERY', viewValue: 'Delivery' }
    ];

    // Form Validation
    nameFC = new FormControl('', [
        Validators.required
    ]);
    passwordFC = new FormControl('', [
        Validators.required
    ]);
    addressFC = new FormControl('', [
        Validators.required
    ]);
    phoneFC = new FormControl('', [
        Validators.required
    ]);
    cityFC = new FormControl('', [
        Validators.required
    ]);
    otpFC = new FormControl('', [
        Validators.required
    ]);
    vehicleFC = new FormControl('', [
        Validators.required,
        Validators.pattern(vehicleNumberRegex)
    ]);

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {}

    signUp() {
        this.authenticationService.signUp(this.model)
            .subscribe(result => {
                if (result.success === true) {
                    this.router.navigate(['/login']);
                    this.model = null;

                } else {
                    console.log(result);
                    if ( JSON.parse(result._body).isJoi === true ) {
                        console.log(JSON.parse(result._body).details[0].message);
                        this.serverError = JSON.parse(result._body).details[0].message;
                    }
                }
            });
    }

    clearServerErrorVariable() {
        this.serverError = '';
    }

    optionChanged() {
        this.nameFC.reset();
        this.passwordFC.reset();
        this.addressFC.reset();
        this.phoneFC.reset();
        this.cityFC.reset();
        this.otpFC.reset();
        this.vehicleFC.reset();
    }
}