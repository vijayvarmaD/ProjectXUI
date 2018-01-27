import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarComponent } from '../navbar/navbar.component';
import { CommService } from '../_services/comm.service';
import { UtilityService } from '../_services/utility.service';
import { AlertHelper } from '../_helpers/alert.helper';
import { GlobalHelper } from '../_helpers/global.helper';

@Component({
    templateUrl: './vendor-view.component.html',
    styleUrls: ['./vendor-view.component.css']
})

export class VendorViewComponent implements OnInit {
    public userPhone: number;

    constructor(
        private router: Router,
        private comms: CommService,
        private globalHelper: GlobalHelper
    ) { }

    ngOnInit() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userPhone = currentUser.phone;
        NavbarComponent.updateUserStatus.next(true);

        this.globalHelper.VendorGlobalServiceCall();
    }
}
