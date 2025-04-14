import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user.model';
import { SystemService } from '../../../service/system.service';

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
  loggedInUser!: User;
  isAdmin: boolean = false;
  welcomeMsg!:string;
  constructor(private userSvc: UserService, private systemSvc: SystemService) {}

  ngOnInit(): void {
    this.subscription = this.userSvc.list().subscribe((resp) => {
      this.users = resp;
      this.welcomeMsg = this.systemSvc.loggedInUser 
        ? `Welcome, ${this.systemSvc.loggedInUser.firstName} ${this.systemSvc.loggedInUser.lastName}~` 
        : 'Welcome, Guest~';
      this.loggedInUser = this.systemSvc.loggedInUser!;
      this.isAdmin = this.loggedInUser?.admin;
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
