import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarComponent } from '../../navbar/navbar.component';
import { GlobalHelper } from '../../_helpers/global.helper';
import { ViewsService } from '../../_services/views.service';

@Component({
    templateUrl: './vendor-orders.component.html',
    styleUrls: ['./vendor-orders.component.css']
})

export class VendorOrdersComponent implements OnInit {

    offset = 2;
    total = [{name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}, {name: 'e'}, {name: 'f'}, {name: 'g'}, {name: 'h'}];
    currentOrders = [];
    constructor(
        private router: Router,
        private globalHelper: GlobalHelper,
        private viewsService: ViewsService
    ) {
    }

    ngOnInit() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        NavbarComponent.updateUserStatus.next(true);

        this.viewsService.getCurrentOrders().subscribe(data => {
            console.log(data);
            this.currentOrders = data.orderData;
        });

        this.globalHelper.VendorGlobalServiceCall();
    }

    scroll(index: number)  {
        const elements = document.querySelectorAll('.mad');
        const el = elements[index - 1] as HTMLElement;
        el.scrollIntoView({behavior: 'smooth', block: 'center'});
      }

      scrollLeft() {
        if (this.offset === 2) {
            return 1;
        }
        this.offset--;
        this.scroll(this.offset);
      }

      scrollRight() {
        if (this.offset === this.currentOrders.length - 1) {
            return 1;
        }
        this.offset++;
        this.scroll(this.offset);
      }
}
