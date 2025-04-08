import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { RequestService } from '../../../service/request.service';
import { Request } from '../../../model/request.model';

@Component({
  selector: 'app-request-detail',
  standalone: false,
  templateUrl: './request-detail.component.html',
  styleUrl: './request-detail.component.css',
})
export class RequestDetailComponent implements OnInit, OnDestroy {
  title: string = 'Request-Detail';
  requestId!: number;
  request!: Request;
  subscription!: Subscription;

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get Id from URL
    this.actRoute.params.subscribe((parms) => {
      this.requestId = parms['id'];
      // get request by id
      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        // corrected service call from userSvc to requestSvc
        next: (resp) => {
          this.request = resp;
        },
        error: (err) => {
          console.error('Error fetching request:', err);
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteRequest() {
    this.requestSvc.delete(this.requestId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.error('Error deleting request:', err);
      },
    });
  }
}
