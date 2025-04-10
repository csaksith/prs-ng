import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Vendor } from '../../../model/vendor.model';
import { VendorService } from '../../../service/vendor.service';
import { User } from '../../../model/user.model';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-vendor-detail',
  standalone: false,
  templateUrl: './vendor-detail.component.html',
  styleUrl: './vendor-detail.component.css',
})
export class VendorDetailComponent implements OnInit, OnDestroy {
  title: string = 'Vendor-Detail';
  vendorId!: number;
  vendor!: Vendor;
  subscription!: Subscription;
  loggedInUser!: User;
  isAdmin: boolean = false;
  welcomeMsg!:string;

  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private systemSvc: SystemService
  ) {}
  ngOnInit(): void {
    // get vendorId from URL
    this.actRoute.params.subscribe((parms) => {
      this.vendorId = parms['id'];
      // get vendor by id
      this.subscription = this.vendorSvc.getById(this.vendorId).subscribe({
        next: (resp) => {
          this.vendor = resp;
          this.welcomeMsg=`Welcome, ${this.systemSvc.loggedInUser.firstName} ${this.systemSvc.loggedInUser.lastName}~`;
          this.loggedInUser = this.systemSvc.loggedInUser;
          this.isAdmin = this.loggedInUser.admin;
        },
        error: (err) => {
          console.error('Error fetching vendor:', err);
        },
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteVendor() {
    this.vendorSvc.delete(this.vendorId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/vendor-list');
      },
      error: (err) => {
        console.error('Error deleting vendor:', err);
      },
    });
  }
}
