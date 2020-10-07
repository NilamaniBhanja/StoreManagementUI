export class Brand {
    public id: number;
    public name: string;
    public description: string;
    public brandQuality: string;

    // constructor(id: number, name : string,description :string, brandQuality : string )
    // {
    //     this.id = id;
    //     this.name=name;
    //     this.description = description;
    //     this.brandQuality = brandQuality;
    // }
}

export class Measurement {
    public id: number;
    public name: string;
    public description: string;
}
export class Address {
    public id?: number;
    public address1?: string;
    public address2?: string;
    public landMark?: string;
    public city?: string;
    public state?: string;
    public country?: string;
    public pinCode?: string;
    public mobileNo?: string;
    public landLine?: string;
    public supplierId ?: number;
}

export class Supplier {
    public id?: number;
    public name?: string;
    public supplierType?: string;
    public businessType?: string;
    public address?: Address;
}

export class Category {
    public id: number;
    public name: string;
    public description: string;
}

export class ProductCost {
    public id: number;
    public listPrice: any;
    public price: any;
    public price50: any;
    public price100: any;
    public effectiveDate: any;
}