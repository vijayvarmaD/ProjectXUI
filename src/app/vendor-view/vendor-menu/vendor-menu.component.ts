import { Component, OnInit, Inject, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdChipInputEvent, ENTER, MdPaginator, MdSort } from '@angular/material';
import { FormControl, ReactiveFormsModule, Validators, NgForm } from '@angular/forms';

import { ProductsService } from '../../_services/products.service';
import { VendorViewMenu } from '../../_models/vendor.menu';
import { NavbarComponent } from '../../navbar/navbar.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

// Used for Chip list
const COMMA = 188;

@Component({
    templateUrl: './vendor-menu.component.html',
    styleUrls: ['./vendor-menu.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class VendorMenuComponent implements OnInit {
    // Subjects
    public static updateMenuView: Subject<boolean> = new Subject();

    // Table functions
    @ViewChild(MdPaginator) paginator: MdPaginator;
    @ViewChild(MdSort) sort: MdSort;
    @ViewChild('filter') filter: ElementRef;

    // declarations
    dbGenerator = new DBGenerator(this.productsService);
    dataSource: VendorMenuDatabase | null;
    displayedColumns = ['availability', 'name', 'cuisine', 'veg', 'unitPrice', 'edit/delete'];
    public userPhone: number;

    constructor(
        private router: Router,
        private productsService: ProductsService,
        public dialog: MdDialog
    ) {
        // Subject Subscriber - Update view menu
        VendorMenuComponent.updateMenuView.subscribe(res => {
            this.dbGenerator.refreshData();
        });
    }

    ngOnInit() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userPhone = currentUser.phone;
        NavbarComponent.updateUserStatus.next(true);

        // Populate Table  Main - call
        this.dataSource = new VendorMenuDatabase(this.dbGenerator, this.paginator, this.sort);

        // Filter
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) { return; }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    // Modal - delete confirm
    openDeleteConfirm(name, _id): void {
        const dialogRef = this.dialog.open(VendorProductDeleteConfirmDialog, {
            width: '350px',
            data: { name: name, _id: _id }
        });
    }

    // Modal - Edit form
    openEditForm(menuData): void {
        // To prevent 2 - way data binding we are cloning the menuData to a new variable for dialog usage
        const formModel = JSON.parse(JSON.stringify(menuData));
        const dialogRef = this.dialog.open(VendorProductEditFormDialog, {
            width: '350px',
            data: { formModel }
        });
    }

}

export class DBGenerator {
    dataChange: BehaviorSubject<VendorViewMenu[]> = new BehaviorSubject<VendorViewMenu[]>([]);
    get data(): VendorViewMenu[] { return this.dataChange.value; }
    dataFromService = [];

    constructor(private productsService: ProductsService) {
        this.generatorOn();
    }

    getData() {
        let dataRecieved = this.data.slice();
        dataRecieved = this.dataFromService;
        this.dataChange.next(dataRecieved);
    }

    refreshData() {
        this.generatorOn();
    }

    generatorOn() {
        this.productsService.getVendorMenu().subscribe( res => {
            this.dataFromService = res;
            this.getData();
        });
    }
}

export class VendorMenuDatabase extends DataSource<any> {
    // Filter
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }
    constructor(
        private _dbgenerator: DBGenerator,
        private _paginator: MdPaginator,
        private _sort: MdSort
    ) {
        super();
    }

    connect(): Observable<VendorViewMenu[]> {
        const displayDataChanges = [
            this._dbgenerator.dataChange,
            this._paginator.page,
            this._sort.sortChange,
            this._filterChange
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            // Sliced data
            const data = this._dbgenerator.data.slice();

            // Sorted Data
            const sortedData = this.sortData(data.slice());

            // Slice of Filtered and Sorted data
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            const renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
            return renderedData.filter((item: VendorViewMenu) => {
                const searchStr = (item.name + item.cuisine + item.unitPrice).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
        });
        // return this.productsService.getVendorMenu();
    }

    disconnect() { }

    // Sorting Function
    sortData(data: VendorViewMenu[]): VendorViewMenu[] {
        if (!this._sort.active || this._sort.direction === '') { return data; }

        return data.sort((a, b) => {
            let propertyA: number|string = '';
            let propertyB: number|string = '';

            switch (this._sort.active) {
                case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
                case 'cuisine': [propertyA, propertyB] = [a.cuisine, b.cuisine]; break;
                case 'unitPrice': [propertyA, propertyB] = [a.unitPrice, b.unitPrice]; break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyB;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyA;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }

}

@Component ({
    templateUrl: './dialogs/vendorProduct-delete-confirm-dialog.html',
    styleUrls: ['./dialogs/vendorProduct-delete-confirm-dialog.css']
})
export class VendorProductDeleteConfirmDialog {
    constructor(
        public dialogRef: MdDialogRef<VendorProductDeleteConfirmDialog>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private productsService: ProductsService
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    onDeleteConfirm(_id): void {
        this.productsService.deleteVendorProduct(_id)
            .subscribe(result => {
                if (result.success === true) {
                    VendorMenuComponent.updateMenuView.next(true);
                } else {
                    console.log(result);
                }
            });
    }
}

@Component ({
    templateUrl: './dialogs/vendorProduct-edit-form-dialog.html',
    styleUrls: ['./dialogs/vendorProduct-edit-form-dialog.css']
})
export class VendorProductEditFormDialog implements OnInit {
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes = [ENTER, COMMA];
    ingredients = [];
    modeldata = this.data.formModel;
    // form related declarations
    modelDialog: any = this.modeldata;

    // Form Control
    myControlD: FormControl = new FormControl();

    // Form Validation
    nameFCD = new FormControl('', [
        Validators.required
    ]);

    cuisineFCD = new FormControl('', [
        Validators.required
    ]);

    unitPriceFCD = new FormControl('', [
        Validators.required
    ]);
    constructor(
        public dialogRef: MdDialogRef<VendorProductEditFormDialog>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private productService: ProductsService
    ) {}

    ngOnInit() {
        this.populateChips();
    }

    populateChips() {
        this.data.formModel.ingredients.forEach(element => {
            this.ingredients.push({ name: element });
        });
    }

    add(event: MdChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        // Add our person
        if ((value || '').trim()) {
            this.ingredients.push({ name: value.trim() });
            this.modelDialog.ingredients.push(value.trim());
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
            this.modelDialog.ingredients.splice(index, 1);
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onEditForm(modelDialog): void {
        const editObj = {
            pId: modelDialog._id,
            name: modelDialog.name,
            cuisine: modelDialog.cuisine,
            ingredients: modelDialog.ingredients,
            veg: modelDialog.veg,
            unitPrice: modelDialog.unitPrice,
            vendor: modelDialog.vendor
        };
        this.productService.editVendorProduct(editObj)
            .subscribe(result => {
                if (result.success === true) {
                    VendorMenuComponent.updateMenuView.next(true);
                } else {
                    console.log(result);
                }
            });
    }
}

