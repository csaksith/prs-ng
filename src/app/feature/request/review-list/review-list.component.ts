import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../service/request.service';
import { User } from '../../../model/user.model';
import { Request } from '../../../model/request.model';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-review-list',
  standalone: false,
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css',
})
export class ReviewListComponent implements OnInit {
  title: string = 'Request-Review';
  requests!: Request[];
  loggedInUser!: User;
  isAdmin: boolean = false;
  welcomeMsg!: string;
  constructor(
    private requestSvc: RequestService,
    private systemSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.systemSvc.loggedInUser;
    this.isAdmin = this.systemSvc.loggedInUser.admin;
    this.welcomeMsg = `Welcome, ${this.loggedInUser.firstName} ${this.loggedInUser.lastName}~`;
    this.requestSvc.getRequestsForReview(this.loggedInUser.id).subscribe({
      next: (resp) => {
        this.requests = resp;
      },
      error: (err) => {
        console.error('Error fetching requests for review:', err);
      },
    });
  }
}
