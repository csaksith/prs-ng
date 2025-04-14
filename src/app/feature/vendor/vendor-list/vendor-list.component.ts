import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor.model';
import { VendorService } from '../../../service/vendor.service';
import { User } from '../../../model/user.model';
import { SystemService } from '../../../service/system.service';
@Component({
  selector: 'app-vendor-list',
  standalone: false,
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.css',
})
export class VendorListComponent implements OnInit, OnDestroy {
  title: string = 'Vendor-List';
  vendors!: Vendor[];
  subscription!: Subscription;
  loggedInUser!: User;
  isAdmin: boolean = false;
  welcomeMsg!: string;
  constructor(
    private vendorSvc: VendorService,
    private systemSvc: SystemService
  ) {}
  ngOnInit(): void {
    this.subscription = this.vendorSvc.list().subscribe((resp) => {
      this.vendors = resp;
      if (this.systemSvc.loggedInUser) {
        this.welcomeMsg = `Welcome, ${this.systemSvc.loggedInUser.firstName} ${this.systemSvc.loggedInUser.lastName}~`;
      } else {
        this.welcomeMsg = 'Welcome, Guest~';
      }
      this.loggedInUser = this.systemSvc.loggedInUser!;
      this.isAdmin = this.loggedInUser.admin;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(id: number) {
    this.subscription = this.vendorSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.vendorSvc.list().subscribe((resp) => {
          this.vendors = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting vendor');
        alert('Error deleting vendor');
      },
    });
  }
}
