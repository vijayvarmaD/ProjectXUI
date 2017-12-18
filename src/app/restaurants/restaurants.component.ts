import { Component, OnInit, Inject } from '@angular/core';
import { Router} from '@angular/router';

import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { RestaurantList } from '../_models/customer.restaurants';
import { ViewsService } from '../_services/views.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    templateUrl: './restaurants.component.html',
    styleUrls: ['./restaurants.component.css']
})

export class RestaurantsComponent implements OnInit {
  restaurantsList: RestaurantList[] = [];

  constructor(
    private viewsService: ViewsService,
    private router: Router,
    private dialog: MdDialog
  ) {}

  ngOnInit() {
    // Update Navbar - User logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    NavbarComponent.updateUserStatus.next(true);

    this.viewsService.getVendors().subscribe(
      restaurantsList => {
        this.restaurantsList = restaurantsList;
    });
  }

  restaurantMenuClick(restaurantName, _id) {
    const customerCartData = JSON.parse(localStorage.getItem('customerCartData'));
    console.log(customerCartData);
    if (customerCartData.cart === undefined || customerCartData.vendor === _id) {
      this.router.navigate(['/menu/' + restaurantName ]);
    } else {
      // call confirm modal
      const dialogRef = this.dialog.open(ClearCartDataConfirmDialogComponent, {
        width: '350px',
        data: { restaurantName: restaurantName }
      });
    }
  }
}

@Component ({
  templateUrl: './dialogs/clear-cart-data-confirm-dialog.html',
  styleUrls: ['./dialogs/clear-cart-data-confirm-dialog.css']
})
export class ClearCartDataConfirmDialogComponent {
  constructor(
    public dialogRef: MdDialogRef<ClearCartDataConfirmDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClearCartConfirm(): void {
    localStorage.setItem('customerCartData', JSON.stringify({}));
    this.router.navigate(['/menu/' + this.data.restaurantName ]);
  }
}
