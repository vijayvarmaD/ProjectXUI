import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommService } from '../_services/comm.service';
import { UtilityService } from '../_services/utility.service';
import { AlertHelper } from './alert.helper';

@Injectable()

export class GlobalHelper {
    constructor(
        private comms: CommService,
        private utility: UtilityService,
        private alertHelper: AlertHelper
    ) {}

    VendorGlobalServiceCall() {
        this.comms.connect2Server();
        // New Order Notification
        this.comms.newOrderNotifcation().subscribe(order => {
            // Call service for order details
            this.utility.orderDetailsAlert(order).subscribe(data => {
                this.alertHelper.alertNewOrder2Vendor(data);
            });
        });
    }
}