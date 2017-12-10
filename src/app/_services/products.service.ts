import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';
import { CustomerProducts } from '../_models/customerProducts';
import { VendorViewMenu } from '../_models/vendor.menu';


@Injectable()

export class ProductsService {

    url: any = 'http://localhost:3000/api/products';

    constructor (
        private http: Http,
        private authenticationService: AuthenticationService
    ) {}

    getproducts(): Observable<CustomerProducts[]> {
        // add authorization header with jwt token
        const headers = new Headers({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        // get products from api
        return this.http.get(this.url + '/Customer/view', options).map((response: Response) => response.json());
    }

    getVendorMenu(): Observable<VendorViewMenu[]> {
        const headers = new Headers({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + '/Vendor/view', options).map((response: Response) => response.json());
    }

    addVendorProduct(model: any, ingredients: any): Observable<any> {
        const bodyReq = {
            'name': model.name,
            'cuisine': model.cuisine,
            'ingredients': ingredients,
            'veg': model.veg,
            'unitPrice': model.unitPrice
        };
        const headers = new Headers({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + '/Vendor/addproduct', bodyReq, options)
            .map((response: Response) => {
                const successCheck = response.json();
                if (successCheck) {
                    const resultObject = { success: true };
                    return resultObject;
                }
            });
    }

    deleteVendorProduct(_id): Observable<any> {
        const bodyreq = { 'pId': _id };
        const headers = new Headers({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + '/Vendor/DeleteProduct', bodyreq, options)
            .map((response: Response) => {
                const successCheck = response.json();
                if (successCheck) {
                    const resultObject = { success: true };
                    return resultObject;
                }
            });
    }

    editVendorProduct(editObj): Observable<any> {
        const bodyreq = {
            'pId': editObj.pId,
            'name': editObj.name,
            'cuisine': editObj.cuisine,
            'ingredients': editObj.ingredients,
            'veg': editObj.veg,
            'unitPrice': editObj.unitPrice,
            'vendor': editObj.vendor
        };
        const headers = new Headers({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + '/Vendor/EditProduct', bodyreq, options)
            .map((response: Response) => {
                const successCheck = response.json();
                if (successCheck) {
                    const resultObject = { success: true };
                    return resultObject;
                }
            });
    }
}
