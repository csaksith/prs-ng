import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menu-item.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  title: string = 'PRS';
  menuItems: MenuItem[] = [];
  loggedInUser!: User;
  isAdmin: boolean = false;
  isReviewer: boolean = false;
  welcomeMsg!: string;
  ngOnInit(): void {
    this.menuItems = [
      new MenuItem('User', '/user-list', 'User List'),
      new MenuItem('Vendor', '/vendor-list', 'Vendor List'),
      new MenuItem('Product', '/product-list', 'Product List'),
      new MenuItem('Request', '/request-list', 'Request List'),
      new MenuItem('Review', '/review', 'Review List'),
    ];
  }
}
