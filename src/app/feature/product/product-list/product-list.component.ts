import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product.model';
import { ProductService } from '../../../service/product.service';
import { User } from '../../../model/user.model';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit, OnDestroy {
  title: string = 'Product-List';
  products!: Product[];
  subscription!: Subscription;
  loggedInUser!: User;
  isAdmin: boolean = false;
  welcomeMsg!: string;
  constructor(
    private productSvc: ProductService,
    private systemSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.subscription = this.productSvc.list().subscribe((resp) => {
      this.products = resp;
      this.welcomeMsg = `Welcome, ${this.systemSvc.loggedInUser.firstName} ${this.systemSvc.loggedInUser.lastName}~`;
      this.loggedInUser = this.systemSvc.loggedInUser;
      this.isAdmin = this.loggedInUser.admin;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(id: number) {
    this.subscription = this.productSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.productSvc.list().subscribe((resp) => {
          this.products = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting product');
        alert('Error deleting product');
      },
    });
  }
}
