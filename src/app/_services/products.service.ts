import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';
import { CustomerProducts } from '../_models/customerProducts';

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
}
