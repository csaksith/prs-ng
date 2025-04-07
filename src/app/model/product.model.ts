import { Vendor } from './vendor.model';

export class Product {
  'id': number;
  partNumber: string;
  'name': string;
  price: number;
  'unit': string;
  'photoPath': string;
  vendor: Vendor;

  constructor(
    id: number = 0,
    partNumber: string = '',
    name: string = '',
    price: number = 0,
    unit: string = '',
    photoPath: string = '',
    vendor: Vendor = new Vendor()
  ) {
    this.id = id;
    this.partNumber = partNumber;
    this.name = name;
    this.price = price;
    this.unit = unit;
    this.photoPath = photoPath;
    this.vendor = vendor;
  }
}
