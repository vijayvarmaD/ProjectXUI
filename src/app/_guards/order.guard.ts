import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class OrderGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        // const cartData = localStorage.getItem('customerCartData');
        // console.log(cartData);
        return true;
    }
}
