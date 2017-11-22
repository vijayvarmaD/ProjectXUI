export class VendorMenu {
    vendorName: string;
    vendorProductsMenu: [
        {
            _id: string;
            availability: boolean;
            createdOn: string;
            name: string;
            cuisine: string;
            veg: boolean;
            unitPrice: number;
            vendor: string;
            _v: number;
            ingredients: string[];
        }
    ];
}
