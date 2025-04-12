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
    this.requestId = this.actRoute.snapshot.params['id'];
    this.loggedInUser = this.systemSvc.loggedInUser;
    this.welcomeMsg = `Welcome ${this.loggedInUser.firstName} ${this.loggedInUser.lastName}`;
    this.isAdmin = this.loggedInUser.admin;
    this.loadData(); // Load request and line items
  }
  loadData() {
    // Get updated request (for total)
    this.requestSvc.getById(this.requestId).subscribe({
      next: (resp) => {
        this.request = resp;
      },
      error: (err) => {
        console.error('Error fetching request:', err);
      },
    });
    // Get updated line items
    this.lineItemSvc.getLinesForRequest(this.requestId).subscribe({
      next: (resp) => {
        this.lineitems = resp;
      },
      error: (err) => {
        console.error('Error fetching line items:', err);
      },
    });
    // get vendors
    this.vendorSvc.list().subscribe({
      next: (resp) => {
        this.vendors = resp;
      },
      error: (err) => {
        console.error('Error fetching vendors:', err);
      },
    });
  }
  delete(id: number) {
    this.subscription = this.lineItemSvc.delete(id).subscribe({
      next: () => {
        this.loadData(); // Automatically refreshes both request and lineitems
      },
      error: (err) => {
        console.error('Error deleting line item:', err);
      },
    });
  }
  getVendorName(vendorId: number): string {
    let vendor = this.vendors.find((v) => v.id === vendorId);
    return vendor ? vendor.name : 'Unknown Vendor';
  }

  submitForReview(): void {
  this.requestSvc.submitForReview(this.requestId).subscribe({
    next:() => {
      this.loadData(); // Refresh the request data after submission
    },
    error: (err) => {
      console.error('Error submitting request for review:', err);
    }
  });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
