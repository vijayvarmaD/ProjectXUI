import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class AuthenticationService {
    public token: string;

    url: any = 'http://localhost:3000';

    constructor (private http: Http) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(phoneNo: number, password: string, role: string): Observable<boolean> {
        if (role === 'CUSTOMER') {
            const bodyReq = { 'phone': Number(phoneNo), 'password': password };
            return this.http.post(this.url + '/api/accounts/Customer/Signin', bodyReq)
            .map((response: Response) => {
                // login successful if there is a jwt token in the response
                const token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store phone and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ phone: phoneNo, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
        } else if (role === 'VENDOR') {
            const bodyReq = { 'phone': Number(phoneNo), 'password': password };
            return this.http.post(this.url + '/api/accounts/Vendor/Signin', bodyReq)
            .map((response: Response) => {
                // login successful if there is a jwt token in the response
                const token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store phone and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ phone: phoneNo, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
        } else if (role === 'DELIVERY') {
            const bodyReq = { 'phone': Number(phoneNo), 'password': password };
            return this.http.post(this.url + '/api/accounts/DeliveryPerson/Signin', bodyReq)
            .map((response: Response) => {
                // login successful if there is a jwt token in the response
                const token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store phone and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ phone: phoneNo, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
        }
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
