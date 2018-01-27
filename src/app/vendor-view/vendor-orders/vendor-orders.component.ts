import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarComponent } from '../../navbar/navbar.component';
import { GlobalHelper } from '../../_helpers/global.helper';

@Component({
    templateUrl: './vendor-orders.component.html',
    styleUrls: ['./vendor-orders.component.css']
})

export class VendorOrdersComponent implements OnInit {

    constructor(
        private router: Router,
        private globalHelper: GlobalHelper
    ) { }

    ngOnInit() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        NavbarComponent.updateUserStatus.next(true);

        this.globalHelper.VendorGlobalServiceCall();
    }
}
