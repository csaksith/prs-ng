import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Vendor } from '../../../model/vendor.model';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-vendor-edit',
  standalone: false,
  templateUrl: './vendor-edit.component.html',
  styleUrl: './vendor-edit.component.css',
})
export class VendorEditComponent implements OnInit, OnDestroy {
  title: string = 'Vendor-Edit';
  vendorId!: number;
  vendor!: Vendor;
  subscription!: Subscription;
  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get the vendorId from the URL
    this.actRoute.params.subscribe((parms) => {
      this.vendorId = parms['id'];
      // get the vendor by id
      this.subscription = this.vendorSvc.getById(this.vendorId).subscribe({
        next: (resp) => {
          this.vendor = resp;
        },
        error: (err) => {
          console.error('Error fetching vendor:', err);
        },
      });
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  saveVendor() {
    this.vendorSvc.update(this.vendor).subscribe({
      next: (resp) => {
        this.vendor = resp;
        this.router.navigateByUrl('/vendor-list');
      },
      error: (err) => {
        console.log('Error saving vendor: ', err);
      },
    });
  }
}
