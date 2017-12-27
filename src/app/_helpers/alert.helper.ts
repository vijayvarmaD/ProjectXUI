import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NavbarComponent } from '../navbar/navbar.component';

@Injectable()

export class AlertHelper {
    constructor() {}

    alertNewOrder2Vendor(data) {
        const orderData = data;
        // Add to localstorage
        NavbarComponent.updateAlertBox.next('new-order');
    }
}