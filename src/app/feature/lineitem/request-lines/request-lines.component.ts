import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user.model';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';
import { LineitemService } from '../../../service/lineitem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../../../model/request.model';
import { LineItem } from '../../../model/line-item.model';
import { Vendor } from '../../../model/vendor.model';
import { VendorService } from '../../../service/vendor.service';
@Component({
  selector: 'app-request-lines',
  standalone: false,
  templateUrl: './request-lines.component.html',
  styleUrl: './request-lines.component.css',
})
export class RequestLinesComponent implements OnInit, OnDestroy {
  title: string = 'Request-Lines';
  LineTitle: string = 'Line-Items';
  subscription!: Subscription;
  request!: Request;
  requestId!: number;
  productId!: number;
  loggedInUser!: User;
  isAdmin: boolean = false;
  welcomeMsg!: string;
  lineitems: LineItem[] = [];
  vendors: Vendor[] = [];

  constructor(
    private requestSvc: RequestService,
    private systemSvc: SystemService,
    private lineItemSvc: LineitemService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private vendorSvc: VendorService
  ) {}
  ngOnInit(): void {
    // get requestId from URL (/request/:id)
    this.actRoute.params.subscribe((parms) => {
      this.requestId = parms['id'];
      // get requestId to fetch that specific request
      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next: (resp) => {
          // uses requestId and requestSvc to get the request object
          this.request = resp;
          this.welcomeMsg = `Welcome, ${this.systemSvc.loggedInUser.firstName} ${this.systemSvc.loggedInUser.lastName}~`;
          this.loggedInUser = this.systemSvc.loggedInUser;
          this.isAdmin = this.loggedInUser.admin;
        },
        error: (err) => {
          console.error('Error fetching product:', err);
        },
      });
      // get the line items for the requestId
      this.lineItemSvc.getLinesForRequest(this.requestId).subscribe({
        next: (resp) => {
          this.lineitems = resp;
        },
        error: (err) => {
          console.error('Error fetching lines:', err);
        },
      });
      this.vendorSvc.list().subscribe({
        next: (resp) => {
          this.vendors = resp;
        },
        error: (err) => {
          console.error('Error fetching vendors:', err);
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(id: number) {
    this.subscription = this.lineItemSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.lineItemSvc.list().subscribe((resp) => {
          this.lineitems = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting request');
        alert('Error deleting request');
      },
    });
  }

  getVendorName(vendorId: number): string {
    let vendor = this.vendors.find((v) => v.id === vendorId);
    return vendor ? vendor.name : 'Unknown Vendor';
  }
}
