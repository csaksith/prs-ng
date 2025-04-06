import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent implements OnInit, OnDestroy {
  title: string = 'User-Edit';
  userId!: number;
  user!: User;
  subscription!: Subscription;
  constructor(
    private userSvc: UserService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get the userId from the URL
    this.actRoute.params.subscribe((parms) => {
      this.userId = parms['id'];
      // get the user by id
      this.subscription = this.userSvc.getById(this.userId).subscribe({
        next: (resp) => {
          this.user = resp;
        },
        error: (err) => {
          console.error('Error fetching user:', err);
        },
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  saveUser() {
    this.userSvc.update(this.user).subscribe({
      next: (resp) => {
        this.user = resp;
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        console.log('Error saving user: ', err);
      },
    });
  }
}
