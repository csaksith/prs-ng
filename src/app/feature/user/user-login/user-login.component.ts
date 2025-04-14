import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLogin } from '../../../model/user-login';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../model/user.model';
import { UserService } from '../../../service/user.service';
import { SystemService } from '../../../service/system.service';
import { MenuComponent } from '../../../core/menu/menu.component';
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
    private actRoute: ActivatedRoute,
    private systemSvc: SystemService
  ) {}
  ngOnInit(): void {
    this.userLogin.username = 'gelbymishi';
    this.userLogin.password = 'misha123';
  }
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
        // store the user in the system service
        this.systemSvc.loggedInUser = resp;
    
        console.log('User logged in successfully. Welcome ', this.user);
        // navigate to the user list page
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        // invalid login
        this.message = 'Invalid username / password combo. Please try again.';
        console.error('Error logging in user', err);
      },
    });
  }

  
}
