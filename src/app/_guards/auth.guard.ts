import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            const role = JSON.parse(localStorage.getItem('currentUser')).role;

            // Vendor Access
            if ((state.url === '/vendor/home' ||
                state.url === '/vendor/menu' ||
                state.url === '/vendor/menu/addProduct'
                )
                && role === 'VENDOR') {
                    return true;
            }

            // Customer Access
            if ((state.url === '/customer/home') ||
                state.url === '/res' ||
                state.url.startsWith('/menu/')
                && role === 'CUSTOMER') {
                return true;
            }

            // Delivery Access
            if ((state.url === '/delivery/home') ||
                state.url === '/res'
                && role === 'DELIVERY') {
                return true;
            }
        }
        this.router.navigate(['/login']);
        return false;
    }
}
