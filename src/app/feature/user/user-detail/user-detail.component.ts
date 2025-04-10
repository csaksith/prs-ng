import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit, OnDestroy {
  title: string = 'User-Detail';
  userId!: number;
  user!: User;
  subscription!: Subscription;
  loggedInUser!: User;
  isAdmin: boolean = false;
  welcomeMsg!:string
  constructor(
    private userSvc: UserService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private systemSvc: SystemService
  ) {}

  ngOnInit(): void {
    // get userId from URL
    this.actRoute.params.subscribe((parms) => {
      this.userId = parms['id'];
      // get user by id
      this.subscription = this.userSvc.getById(this.userId).subscribe({
        next: (resp) => {
          this.user = resp;
          this.welcomeMsg=`Welcome, ${this.systemSvc.loggedInUser.firstName} ${this.systemSvc.loggedInUser.lastName}~`;
          this.loggedInUser = this.systemSvc.loggedInUser;
          this.isAdmin = this.loggedInUser.admin;
        },
        error: (err) => {
          console.error('Error fetching user:', err);
        },
      });
    });
  }

  deleteUser() {
    this.userSvc.delete(this.userId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
