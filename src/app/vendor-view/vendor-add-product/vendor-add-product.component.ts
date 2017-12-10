import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { FormControl, ReactiveFormsModule, Validators, NgForm } from '@angular/forms';
import 'rxjs/add/observable/of';

import { ProductsService } from '../../_services/products.service';
import { VendorViewMenu } from '../../_models/vendor.menu';
import { NavbarComponent } from '../../navbar/navbar.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MdChipInputEvent, ENTER } from '@angular/material';

// Used for Chip list
const COMMA = 188;

@Component({
    templateUrl: './vendor-add-product.component.html',
    styleUrls: ['./vendor-add-product.component.css']
})

export class VendorAddProductComponent implements OnInit {
    // Declarations
    public userPhone: number;
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes = [ENTER, COMMA];
    ingredients = [];

    // form related declarations
    model: any = {};

    // Form Control
    myControl: FormControl = new FormControl();

    // Form Validation
    nameFC = new FormControl('', [
        Validators.required
    ]);

    cuisineFC = new FormControl('', [
        Validators.required
    ]);

    unitPriceFC = new FormControl( '', [
        Validators.required
    ]);

    constructor(
        private router: Router,
        private productsService: ProductsService
    ) { }

    ngOnInit() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userPhone = currentUser.phone;
        NavbarComponent.updateUserStatus.next(true);
    }

    add(event: MdChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        // Add our person
        if ((value || '').trim()) {
            this.ingredients.push({ name: value.trim() });
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    remove(ingred: any): void {
        const index = this.ingredients.indexOf(ingred);
        if (index >= 0) {
            this.ingredients.splice(index, 1);
        }
    }

    // Submit add item
    addItem() {
        const ing = [];
        this.ingredients.forEach(element => {
            ing.push(element.name);
        });
        if (this.model.veg == null) {
            this.model.veg = false;
        }
        this.productsService.addVendorProduct(this.model, ing)
            .subscribe(result => {
                if (result.success === true) {
                    this.router.navigate(['/vendor/menu']);
                    this.model = null;
                } else {
                    console.log(result);
                }
            });
    }
}