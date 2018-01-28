import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NavbarComponent } from '../navbar/navbar.component';

export class AlertHelper {
    constructor(
    ) {}

    alertNewOrder2Vendor(data) {
        const alertMsg = 'New order from ' + data.customerName.name;
        // Add to localstorage
        NavbarComponent.updateAlertBox.next(alertMsg);
    }
}