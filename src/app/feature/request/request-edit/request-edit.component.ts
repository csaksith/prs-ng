import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user.model';
import { RequestService } from '../../../service/request.service';
import { UserService } from '../../../service/user.service';
import { Request } from '../../../model/request.model';

@Component({
  selector: 'app-request-edit',
  standalone: false,
  templateUrl: './request-edit.component.html',
  styleUrl: './request-edit.component.css',
})
export class RequestEditComponent implements OnInit, OnDestroy {
  title: string = 'Request-Edit';
  request!: Request;
  requestId!: number;
  users: User[] = [];
  subscription!: Subscription;
  deliveryModes: string[] = ['Pickup', 'Mail'];
  constructor(
    private requestSvc: RequestService,
    private userSvc: UserService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get requestId from the url, then get the request
    this.actRoute.params.subscribe((parms) => {
      this.requestId = parms['id'];
      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next: (resp) => {
          this.request = resp;
        },
        error: (err) => {
          console.error('Error getting request for id: ' + this.requestId);
        },
      });
    });
    // populate users
    this.subscription = this.userSvc.list().subscribe({
      next: (resp) => {
        this.users = resp;
      },
      error: (err) => {
        console.error('Error getting users', err);
      },
    });
  }

  saveRequest() {
    this.subscription = this.requestSvc.update(this.request).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.error('Error editing request: ' + err.message);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  compUser(a: User, b: User): boolean {
    return a && b && a.id === b.id;
  }
}
