import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { NavbarComponent } from '../navbar/navbar.component';

@Injectable()

export class AuthenticationService {
    public token: string;
    public phone: number;
    url: any = 'http://localhost:3000';

    constructor (private http: Http) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.phone = currentUser && currentUser.phone;
    }

    login(phoneNo: number, password: string, role: string): Observable<any> {
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
                    localStorage.setItem('currentUser', JSON.stringify({ phone: phoneNo, token: token, role: role }));

                    // Init cart data and store it in localstorage
                    localStorage.setItem('customerCartData', JSON.stringify({}));

                    // return true to indicate successful login
                    const resultObject = { success: true, role: role };
                    return resultObject;
                } else {
                    // return false to indicate failed login
                    const resultObject = { success: false };
                    return resultObject;
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
                    localStorage.setItem('currentUser', JSON.stringify({ phone: phoneNo, token: token, role: role }));

                    // return true to indicate successful login
                    const resultObject = { success: true, role: role };
                    return resultObject;
                } else {
                    // return false to indicate failed login
                    const resultObject = { success: false };
                    return resultObject;
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
                    localStorage.setItem('currentUser', JSON.stringify({ phone: phoneNo, token: token, role: role }));

                    // return true to indicate successful login
                    const resultObject = { success: true, role: role };
                    return resultObject;
                } else {
                    // return false to indicate failed login
                    const resultObject = { success: false };
                    return resultObject;
                }
            });
        }
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('customerCartData');
        NavbarComponent.updateUserStatusLogout.next(true);
    }

    signUp(model: any): Observable<any> {
        if (model.userRole === 'CUSTOMER') {
            const bodyReq = {
                'name': model.name,
                'password': model.password,
                'address': model.address,
                'phone': model.phone,
                'city': model.city
            };
            return this.http.post(this.url + '/api/accounts/Customer/Signup', bodyReq)
            .map((response: Response) => {
                const successCheck = response.json();
                console.log(successCheck);
                if (successCheck) {
                    const resultObject = { success: true };
                    return resultObject;
                }
            });
        } else if (model.userRole === 'VENDOR') {
            const bodyReq = {
                'name': model.name,
                'password': model.password,
                'address': model.address,
                'phone': model.phone,
                'city': model.city,
                'userRole': model.userRole,
                'otp': model.otp
            };
            return this.http.post(this.url + '/api/accounts/Vendor/Signup', bodyReq)
            .map((response: Response) => {
                const successCheck = response.json();
                if (successCheck) {
                    const resultObject = { success: true };
                    return resultObject;
                }
            });
        } else if (model.userRole === 'DELIVERY') {
            const bodyReq = {
                'name': model.name,
                'password': model.password,
                'address': model.address,
                'phone': model.phone,
                'city': model.city,
                'userRole': model.userRole,
                'otp': model.otp,
                'vehicleNo': model.vehicleNo
            };
            return this.http.post(this.url + '/api/accounts/DeliveryPerson/Signup', bodyReq)
            .map((response: Response) => {
                const successCheck = response.json();
                if (successCheck) {
                    const resultObject = { success: true };
                    return resultObject;
                }
            })
            .catch((e: any) => {
                return Observable.of(e);
            });
        }
    }
}
