import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarComponent } from '../navbar/navbar.component';
import { CommService } from '../_services/comm.service';
import * as io from 'socket.io-client';

@Component({
    templateUrl: './customer-view.component.html',
    styleUrls: ['./customer-view.component.css']
})

export class CustomerViewComponent implements OnInit {
    public userPhone: number;

    constructor(
        private router: Router,
        private comms: CommService
    ) {
    }

    ngOnInit() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userPhone = currentUser.phone;
        NavbarComponent.updateUserStatus.next(true);
        // this.comms.getMessages().subscribe(message => {
        //     console.log(message);
        // });
    }
}
