import { Component, OnInit } from '@angular/core';

import { RestaurantList } from '../_models/customer.restaurants';
import { ViewsService } from '../_services/views.service';


@Component({
    templateUrl: './restaurants.component.html',
    styleUrls: ['./restaurants.component.css']
  })
  export class RestaurantsComponent implements OnInit {
    restaurantsList: RestaurantList[] = [];

    constructor(private viewsService: ViewsService) {}

    ngOnInit() {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.viewsService.getVendors()
          .subscribe(restaurantsList => { this.restaurantsList = restaurantsList; });
    }
  }