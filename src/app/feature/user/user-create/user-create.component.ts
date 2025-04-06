import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  standalone: false,
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent implements OnInit,OnDestroy{
  title: string = 'User-Create';
  newUser: User = new User();
  subscription!:Subscription;
  constructor(private userSvc: UserService, private router: Router) {}
  ngOnInit(): void {}
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  addUser(){
    this.subscription = this.userSvc.add(this.newUser).subscribe((resp) => {
      this.router.navigateByUrl('/user-list');
    });
  }
}
