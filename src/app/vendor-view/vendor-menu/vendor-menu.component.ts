import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ProductsService } from '../../_services/products.service';
import { VendorViewMenu } from '../../_models/vendor.menu';
import { NavbarComponent } from '../../navbar/navbar.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    templateUrl: './vendor-menu.component.html',
    styleUrls: ['./vendor-menu.component.css']
})

export class VendorMenuComponent implements OnInit {
    dataSource = new VendorMenuDatabase(this.productsService);
    displayedColumns = ['availability', 'name', 'cuisine', 'veg', 'unitPrice', 'ingredients'];
    public userPhone: number;

    constructor(
        private router: Router,
        private productsService: ProductsService
    ) { }

    ngOnInit() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userPhone = currentUser.phone;
        NavbarComponent.updateUserStatus.next(true);
    }
}

export class VendorMenuDatabase extends DataSource<any> {
    constructor(
        private productsService: ProductsService
    ) {
        super();
    }

    connect(): Observable<VendorViewMenu[]> {
        return this.productsService.getVendorMenu();
    }

    disconnect() {}
}
