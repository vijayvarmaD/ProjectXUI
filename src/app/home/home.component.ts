import { Component, OnInit } from '@angular/core';

import { CustomerProducts } from '../_models/customerProducts';
import { ProductsService } from '../_services/products.service';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/api/products/Vendor/UploadImg';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {
    // customerProducts: CustomerProducts[] = [];

    // constructor(private productsService: ProductsService) {}

    // // Upload Image
    // public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

    // ngOnInit() {
    //     // get products from api
    //     this.productsService.getproducts()
    //         .subscribe(customerProducts => { this.customerProducts = customerProducts; });
    //     // uploader
    //     this.uploader.onAfterAddingFile = (file) => {
    //         file.withCredentials = false;
    //     };
    // }
}
