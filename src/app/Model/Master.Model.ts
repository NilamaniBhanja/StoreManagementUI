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
    public id: number;
    public address1: string;
    public address2: string;
    public landMark: string;
    public city: string;
    public state: string;
    public country: string;
    public pinCode: string;
    public mobileNo: string;
    public landLine: string;
}

export class Store {
    public id: number;
    public name: string;
    public storeType: string;
    public businessType: string;
    public addressId: string;
    public address: Address;
}