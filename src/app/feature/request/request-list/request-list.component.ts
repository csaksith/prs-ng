import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { RequestService } from '../../../service/request.service';
import { Request } from '../../../model/request.model';
import { User } from '../../../model/user.model';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css',
})
export class RequestListComponent implements OnInit, OnDestroy {
  title: string = 'Request-List';
  requests!: Request[];
  subscription!: Subscription;
  loggedInUser!: User;
  isAdmin: boolean = false;
  welcomeMsg!: string;
  constructor(
    private requestSvc: RequestService,
    private systemSvc: SystemService
  ) {}
  ngOnInit(): void {
    this.subscription = this.requestSvc.list().subscribe((resp) => {
      this.requests = resp;
      this.welcomeMsg = `Welcome, ${this.systemSvc.loggedInUser.firstName} ${this.systemSvc.loggedInUser.lastName}~`;
      this.loggedInUser = this.systemSvc.loggedInUser;
      this.isAdmin = this.loggedInUser.admin;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(id: number) {
    this.subscription = this.requestSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.requestSvc.list().subscribe((resp) => {
          this.requests = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting request');
        alert('Error deleting request');
      },
    });
  }
}
