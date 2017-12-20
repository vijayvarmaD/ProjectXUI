import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Models
import { VendorMenu } from '../_models/customer.menu';

// Services & Components
import { ViewsService } from '../_services/views.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
    vendorMenu: VendorMenu[] = [];
    vendorData = [];
    vendorName: String;
    cartData: any;
    cartAmount: Number = 0;
    carterData: any;

    constructor(
        private viewsService: ViewsService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        // Update Navbar - User logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        NavbarComponent.updateUserStatus.next(true);

        // Init cartData with vendor ID
        const cartStorage = JSON.parse(localStorage.getItem('customerCartData'));

        // Restaurant Name from route param
        const restaurantName = this.activatedRoute.snapshot.params['id'];
        this.vendorName = restaurantName;

        // Menu of the selected Restaurant Name
        this.viewsService.getMenu().subscribe(vendorMenu => {
            this.vendorMenu = vendorMenu;
            for (const x of this.vendorMenu) {
                if (x.vendorName === restaurantName) {
                    this.vendorData = x.vendorProductsMenu;
                }
            }

            // Updating the cart storage after refresh or init
            if (cartStorage.cart === undefined) {
                this.cartData = { vendor: this.vendorData[0].vendor, cart: [] };
                // Attaching component variables to product data for cart management when cart is initally empty
                this.vendorData.forEach(product => {
                    product.quantity = 0;
                });
            } else {
                this.cartData = JSON.parse(localStorage.getItem('customerCartData'));
                // Attaching component variables to product data for cart management when cart is not empty
                this.vendorData.forEach(product => {
                    for (const item of this.cartData.cart) {
                        if (product._id === item._id) {
                            product.quantity = item.quantity;
                        }
                    }
                    if (product.quantity === undefined) {
                        product.quantity = 0;
                    }
                });
                this.cartAmount = this.cartData.totalAmount;
            }
            this.carterData = this.cartData.cart;
        });

    }

    // Add selected Product to cart
    add2Cart(product) {
        let productIndexInMenu;
        // Click event from menu buttons
        if (Object.keys(product).length > 4) {
            productIndexInMenu = this.vendorData.indexOf(product);
        } else {
            // click event from cart buttons
            for (const jaffa of this.vendorData) {
                if (jaffa._id === product._id) {
                    productIndexInMenu = this.vendorData.indexOf(jaffa);
                }
            }
        }
        this.vendorData[productIndexInMenu].quantity++;
        const { quantity, _id, name, unitPrice } = product;
        const idCheck = this.cartData.cart.filter((obj) => {
            return obj._id === _id;
        });
        if (idCheck.length === 0) {
            this.cartData.cart.push({ quantity, _id, name, unitPrice });
            this.cartAmount += unitPrice;
        } else {
            for (const item of this.cartData.cart) {
                if (item._id === _id) {
                    item.quantity++;
                    this.cartAmount += item.unitPrice;
                    break;
                }
            }
        }
        this.cartData.totalAmount = this.cartAmount;
        localStorage.setItem('customerCartData', JSON.stringify(this.cartData));
    }

    // Remove selected Product from cart
    removeFromCart(product) {
        let productIndexInMenu;
        // Click event from menu buttons
        if (Object.keys(product).length > 4) {
            productIndexInMenu = this.vendorData.indexOf(product);
        } else {
            // click event from cart buttons
            for (const jaffa of this.vendorData) {
                if (jaffa._id === product._id) {
                    productIndexInMenu = this.vendorData.indexOf(jaffa);
                }
            }
        }
        // Min 1 item quantity is required or else ignore the click
        if (product.quantity !== 0) {
            this.vendorData[productIndexInMenu].quantity--;
            const { quantity, _id, name, unitPrice } = product;
            const idCheck = this.cartData.cart.filter((obj) => {
                return obj._id === _id;
            });
            if (idCheck.length === 1) {
                for (const item of this.cartData.cart) {
                    if (item._id === _id) {
                        item.quantity--;
                        this.cartAmount = (Number(this.cartAmount) - Number(item.unitPrice));
                        if (item.quantity === 0) {
                            this.cartData.cart.splice(this.cartData.cart.indexOf(item), 1);
                        }
                        break;
                    }
                }
                console.log(this.cartData.cart);
            }
            this.cartData.totalAmount = this.cartAmount;
            localStorage.setItem('customerCartData', JSON.stringify(this.cartData));
        }
    }

    // Checkout
    checkoutClick() {
        if (JSON.parse(localStorage.getItem('customerCartData')).cart.length > 0) {
            this.router.navigate(['/order']);
        }
    }
}
