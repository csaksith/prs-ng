import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Vendor } from '../../../model/vendor.model';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-vendor-create',
  standalone: false,
  templateUrl: './vendor-create.component.html',
  styleUrl: './vendor-create.component.css',
})
export class VendorCreateComponent implements OnInit, OnDestroy {
  title: string = 'Vendor-Create';
  newVendor: Vendor = new Vendor();
  subscription!: Subscription;
  State: string[] = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
  constructor(private vendorSvc: VendorService, private router: Router) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  addVendor() {
    this.subscription = this.vendorSvc.add(this.newVendor).subscribe((resp) => {
      this.router.navigateByUrl('/vendor-list');
    });
  }
}
