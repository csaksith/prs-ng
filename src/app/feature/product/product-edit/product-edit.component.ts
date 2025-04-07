import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product.model';
import { ProductService } from '../../../service/product.service';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit, OnDestroy {
  title: string = 'Product-Edit';
  product: Product = new Product();
  productId!: number;
  vendors: Vendor[] = [];
  subscription!: Subscription;
  constructor(
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get productId from the url, then get the product
    this.actRoute.params.subscribe((parms) => {
      this.productId = parms['id'];
      this.subscription = this.productSvc.getById(this.productId).subscribe({
        next: (resp) => {
          this.product = resp;
        },
        error: (err) => {
          console.error('Error getting product for id: ' + this.productId);
        },
      });
    });
    //populate list of vendors
    this.subscription = this.vendorSvc.list().subscribe({
      next: (resp) => {
        this.vendors = resp;
      },
      error: (err) => {
        console.error(
          'Vendor Create Error: error loading vendors.' + err.message
        );
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveProduct() {
    this.productSvc.update(this.product).subscribe({
      next: (resp) => {
        this.product = resp;
        this.router.navigateByUrl('/product-list');
      },
      error: (err) => {
        console.error('Product Edit Error: error saving product', err);
      },
    });
  }

  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }
}
