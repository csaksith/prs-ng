import { Component } from '@angular/core';
import { MenuItem } from '../../model/menu-item.model';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  menuItems: MenuItem[] = [
    new MenuItem('Users','/user-list','')
  ];
}
