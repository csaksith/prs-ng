import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LineitemService } from '../../../service/lineitem.service';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';
import { LineItem } from '../../../model/line-item.model';
import { Request } from '../../../model/request.model';
@Component({
  selector: 'app-request-approve',
  standalone: false,
  templateUrl: './request-approve.component.html',
  styleUrl: './request-approve.component.css',
})
export class RequestApproveComponent implements OnInit {
  title: string = 'Purchase Request Approve/Reject';
  request!: Request;
  requestId!: number;
  lineitems: LineItem[] = [];
  reasonForRejection: string = '';
  constructor(
    private requestSvc: RequestService,
    private lineItemSvc: LineitemService,
    private systemSvc: SystemService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // Grab the request ID from the URL
    this.requestId = this.actRoute.snapshot.params['id'];

    // Get Request Details
    this.requestSvc.getById(this.requestId).subscribe({
      next: (resp) => {
        this.request = resp;
      },
      error: (err) => {
        console.error('Error getting request:', err);
      },
    });
    // Get Line Items for the Request
    this.lineItemSvc.getLinesForRequest(this.requestId).subscribe({
      next: (resp) => {
        this.lineitems = resp;
      },
      error: (err) => {
        console.error('Error getting line items:', err);
      },
    });
  }

approveRequest(): void {
    this.requestSvc.approve(this.requestId).subscribe({
      next: (resp) => {
        console.log('Request approved:', resp);
        this.router.navigate(['/request/review']);
      },
      error: (err) => {
        console.error('Error approving request:', err);
      },
    });
  }

rejectRequest(): void {
  const data = {reasonForRejection: this.reasonForRejection};
  this.requestSvc.reject(this.requestId, data).subscribe({
    next: (resp) => {
      console.log('Request rejected:', resp);
      this.router.navigate(['/review']);
    },
    error: (err) => {
      console.error('Error rejecting request:', err);
    },
  });

}

}
