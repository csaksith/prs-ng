import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLogin } from '../../../model/user-login';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../model/user.model';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent implements OnInit, OnDestroy {
  title: string = 'User-Login';
  userLogin: UserLogin = new UserLogin();
  subscription!: Subscription;
  user!: User;
  message: string = '';
  constructor(
    private userSvc: UserService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loginUser() {
    // call the user userSvc.login(this.userLogin) method to authenticate the user
    this.subscription = this.userSvc.login(this.userLogin).subscribe({
      next: (resp) => {
        // successful login
        this.user = resp;
        console.log('User logged in successfully. Welcome ', this.user);
        // navigate to the user list page
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        // invalid login
        console.error('Error logging in user:', err);
        alert('Login failed. Please check your credentials and try again.');
      },
    });
  }
}
