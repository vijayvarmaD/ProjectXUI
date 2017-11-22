import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
    hide = true;

    myControl: FormControl = new FormControl();
      options = [
        'Customer',
        'Vendor',
        'Delivery'
       ];

    constructor(
        private router: Router
    ) {}

    ngOnInit() {}
}