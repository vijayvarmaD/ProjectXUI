import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarComponent } from '../navbar/navbar.component';
import { CommService } from '../_services/comm.service';
import { UtilityService } from '../_services/utility.service';
import { AlertHelper } from '../_helpers/alert.helper';

@Component({
    templateUrl: './vendor-view.component.html',
    styleUrls: ['./vendor-view.component.css']
})

export class VendorViewComponent implements OnInit {
    public userPhone: number;

    constructor(
        private router: Router,
        private comms: CommService,
        private utility: UtilityService,
        private alertHelper: AlertHelper
    ) { }

    ngOnInit() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userPhone = currentUser.phone;
        NavbarComponent.updateUserStatus.next(true);

        // New Order Notification
        this.comms.newOrderNotifcation().subscribe(order => {
            // Call service for order details
            this.utility.orderDetailsAlert(order).subscribe(data => {
                this.alertHelper.alertNewOrder2Vendor(data);
            });
        });
    }
}
