import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../../../model/user.model';
import { Router } from '@angular/router';
import { RequestService } from '../../../service/request.service';
import { UserService } from '../../../service/user.service';
import { Request } from '../../../model/request.model';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-create',
  standalone: false,
  templateUrl: './request-create.component.html',
  styleUrl: './request-create.component.css',
})
export class RequestCreateComponent implements OnInit, OnDestroy {
  title: string = 'Request-Create';
  newRequest: Request = new Request();
  subscription!: Subscription;
  users!: User[];
  loggedInUser!: User;
  isAdmin: boolean = false;
  welcomeMsg!: string;
  deliveryModes: string[] = ['Pickup', 'Mail'];

  constructor(
    private requestSvc: RequestService,
    private userSvc: UserService,
    private router: Router,
    private systemSvc: SystemService
  ) {}

  ngOnInit(): void {
    // check if user is logged in
    if (this.systemSvc.loggedInUser) {
      this.newRequest.user = this.systemSvc.loggedInUser;
    } else {
      console.error('Logged-in user is null');
    }
    this.welcomeMsg = `Welcome, ${this.newRequest.user.firstName} ${this.newRequest.user.lastName}`;

    // populate users
    this.subscription = this.userSvc.list().subscribe({
      next: (resp) => {
        this.users = resp;
      },
      error: (err) => {
        console.error('Request Create Error: error getting users', err);
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  addRequest(): void {
    const dto = {
      userId: this.newRequest.user.id,
      description: this.newRequest.description,
      justification: this.newRequest.justification,
      dateNeeded: this.newRequest.dateNeeded,
      deliveryMode: this.newRequest.deliveryMode,
    };
    console.log('DTO sent: ', dto);
    this.subscription = this.requestSvc.add(dto).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.error('Request Create Error: error adding request', err);
      },
    });
  }
  compUser(a: User, b: User): boolean {
    return a && b && a.id === b.id;
  }
}
