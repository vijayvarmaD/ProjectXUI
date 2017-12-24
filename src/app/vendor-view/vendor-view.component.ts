import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarComponent } from '../navbar/navbar.component';
import { CommService } from '../_services/comm.service';

@Component({
    templateUrl: './vendor-view.component.html',
    styleUrls: ['./vendor-view.component.css']
})

export class VendorViewComponent implements OnInit {
    public userPhone: number;

    constructor(
        private router: Router,
        private comms: CommService
    ) { }

    ngOnInit() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userPhone = currentUser.phone;
        NavbarComponent.updateUserStatus.next(true);

        // New Order Notification
        this.comms.newOrderNotifcation().subscribe(message => {
            console.log(message);
        });
    }
}
