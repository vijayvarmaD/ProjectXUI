import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VendorMenu } from '../_models/customer.menu';
import { ViewsService } from '../_services/views.service';

@Component({
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
    vendorMenu: VendorMenu[] = [];
    vendorData = [];
    constructor(
        private viewsService: ViewsService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        // Restaurant Name from route param
        const restaurantName = this.activatedRoute.snapshot.params['id'];

        // Menu of the selected Restaurant Name
        this.viewsService.getMenu().subscribe(vendorMenu => {
            this.vendorMenu = vendorMenu;
            console.log(this.vendorMenu);
            for (const x of this.vendorMenu) {
                if (x.vendorName === restaurantName) {
                    this.vendorData = x.vendorProductsMenu;
                }
            }
        });
    }
}
