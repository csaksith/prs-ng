import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menu-item.model';
import { SystemService } from '../../service/system.service';
@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  title: string = 'PRS';
  menuItems: MenuItem[] = [];
  reviewer: boolean = false;
  constructor(private sysSvc: SystemService) {}
  ngOnInit(): void {
    this.reviewer = this.sysSvc.loggedInUser.reviewer;
    console.log('Reviewer:', this.reviewer);
    this.menuItems = [
      new MenuItem('User', '/user-list', 'User List'),
      new MenuItem('Vendor', '/vendor-list', 'Vendor List'),
      new MenuItem('Product', '/product-list', 'Product List'),
      new MenuItem('Request', '/request-list', 'Request List'),
    ];

    if (this.reviewer === true) {
      this.menuItems.push(
        new MenuItem('Review', '/review', 'Review List')
      );
    }
    this.menuItems.push(new MenuItem('Login', '/user-login', 'Login'));
  }
}
