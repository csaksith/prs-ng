import { Request } from './request.model';
import { Product } from './product.model';

export class LineItem {
  id: number;
  request: Request;
  product: Product;
  quantity: number;
  lineitems: LineItem[] = [];
  constructor(
    id: number = 0,
    request: Request = new Request(),
    product: Product = new Product(),
    quantity: number = 1
  ) {
    this.id = id;
    this.request = request;
    this.product = product;
    this.quantity = quantity;
  }
}
