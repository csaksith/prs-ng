import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from '../../../model/product.model';
import { ProductService } from '../../../service/product.service';
import { User } from '../../../model/user.model';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  title: string = 'Product-Detail';
  productId!: number;
  product!: Product;
  subscription!: Subscription;
  loggedInUser!: User;
  isAdmin: boolean = false;
  welcomeMsg!: string;
  constructor(
    private productSvc: ProductService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private systemSvc: SystemService
  ) {}

  ngOnInit(): void {
    // get Id from URL
    this.actRoute.params.subscribe((parms) => {
      this.productId = parms['id'];
      // get product by id
      this.subscription = this.productSvc.getById(this.productId).subscribe({
        // corrected service call from userSvc to productSvc
        next: (resp) => {
          this.product = resp;
          if (this.systemSvc.loggedInUser) {
            this.welcomeMsg = `Welcome, ${this.systemSvc.loggedInUser.firstName} ${this.systemSvc.loggedInUser.lastName}~`;
          } else {
            this.welcomeMsg = 'Welcome, Guest~';
          }
          this.loggedInUser = this.systemSvc.loggedInUser || {} as User;
          this.isAdmin = this.loggedInUser.admin;
        },
        error: (err) => {
          console.error('Error fetching product:', err);
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteProduct() {
    this.productSvc.delete(this.productId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/product-list');
      },
      error: (err) => {
        console.error('Error deleting product:', err);
      },
    });
  }
}
