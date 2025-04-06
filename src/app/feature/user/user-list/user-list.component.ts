import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit, OnDestroy {
  title: string = 'User-List';
  users!: User[];
  subscription!: Subscription;
  constructor(private userSvc: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userSvc.list().subscribe((resp) => {
      this.users = resp;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(id: number) {
    this.subscription = this.userSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.userSvc.list().subscribe((resp) => {
          this.users = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting user');
        alert('Error deleting user');
      },
    });
  }
}
