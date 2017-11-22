import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { RestaurantList } from '../_models/customer.restaurants';
import { ViewsService } from '../_services/views.service';

@Component({
    templateUrl: './restaurants.component.html',
    styleUrls: ['./restaurants.component.css']
})

export class RestaurantsComponent implements OnInit {
  restaurantsList: RestaurantList[] = [];

  constructor(
    private viewsService: ViewsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.viewsService.getVendors().subscribe(
      restaurantsList => {
        this.restaurantsList = restaurantsList;
    });
  }
}
