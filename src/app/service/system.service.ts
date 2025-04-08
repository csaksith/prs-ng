import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  loggedInUser: User = new User();

  constructor(private router: Router) {}

  checkLogin() {
    // check if user is logged in, if not -> redirect to login page
    if (this.loggedInUser.id == 0) {
      console.log('User not authenticated, redirecting to login page...');
      // redirect to login page
      this.router.navigate(['/user-login']);
    }
  }
}
