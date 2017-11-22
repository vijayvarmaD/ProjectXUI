import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    templateUrl: './customer-view.component.html',
    styleUrls: ['./customer-view.component.css']
})

export class CustomerViewComponent implements OnInit {
    public userPhone: number;

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userPhone = currentUser.phone;
        NavbarComponent.updateUserStatus.next(true);
    }
}