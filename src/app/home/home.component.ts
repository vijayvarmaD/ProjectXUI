import { Component, OnInit } from '@angular/core';

import { CustomerProducts } from '../_models/customerProducts';
import { ProductsService } from '../_services/products.service';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    customerProducts: CustomerProducts[] = [];

    constructor(private productsService: ProductsService) {}

    ngOnInit() {
        // get products from api
        this.productsService.getproducts()
            .subscribe(customerProducts => { this.customerProducts = customerProducts; });
    }
}
