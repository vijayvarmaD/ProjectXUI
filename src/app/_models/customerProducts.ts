export class CustomerProducts {
    vendorName: string;
    vendorProductsMenu: [{
        _id: string;
        availability: boolean;
        createdOn: Date;
        name: string;
        cuisine: string;
        veg: boolean;
        unitPrice: number;
        vendor: string;
        ingredients: string[];
    }];
}
