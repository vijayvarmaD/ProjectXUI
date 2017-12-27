import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';
import { CustomerProducts } from '../_models/customerProducts';
import { VendorViewMenu } from '../_models/vendor.menu';

@Injectable()

export class UtilityService {
    url: any = 'https://eatup-api.herokuapp.com/api/wallets/customer/details';
    orderurl: any = 'https://eatup-api.herokuapp.com/api/orders/OrderData/id';

    constructor (
        private http: Http,
        private authenticationService: AuthenticationService
    ) {}

    getWalletBalance(): Observable<any> {
        // add authorization header with jwt token
        const headers = new Headers({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.url, options).map((response: Response) => response.json());
    }

    orderDetailsAlert(order: any): Observable<any> {
        const bodyReq = {
            'oId': order.oId
        };
        // add authorization header with jwt token
        const headers = new Headers({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.orderurl, bodyReq, options).map((response: Response) => response.json());
    }
}