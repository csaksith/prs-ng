import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LineItem } from '../../../model/line-item.model';
import { Product } from '../../../model/product.model';
import { LineitemService } from '../../../service/lineitem.service';
import { ProductService } from '../../../service/product.service';
import { Request } from '../../../model/request.model';
import { User } from '../../../model/user.model';
import { SystemService } from '../../../service/system.service';
import { RequestService } from '../../../service/request.service';

@Component({
  selector: 'app-lineitem-create',
  standalone: false,
  templateUrl: './lineitem-create.component.html',
  styleUrl: './lineitem-create.component.css',
})
export class LineitemCreateComponent implements OnInit, OnDestroy {
  title: string = 'Line-Item-Create';
  newLineItem: LineItem = new LineItem();
  products!: Product[];
  subscription!: Subscription;
  requestId!: number;
  request: Request = new Request();
  loggedInUser!: User;
  isAdmin: boolean = false;
  welcomeMsg!: string;
  constructor(
    private lineItemSvc: LineitemService,
    private productSvc: ProductService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private systemSvc: SystemService,
    private requestSvc: RequestService
  ) {}
  ngOnInit(): void {
    // check if user is logged in
    if (this.systemSvc.loggedInUser) {
      this.loggedInUser = this.systemSvc.loggedInUser;
    } else {
      throw new Error('No logged-in user found.');
    }
    this.welcomeMsg = `Welcome, ${this.loggedInUser.firstName} ${this.loggedInUser.lastName}`;
    this.requestId = +this.actRoute.snapshot.params['requestId'];

    // get full request object
    this.requestSvc.getById(this.requestId).subscribe({
      next: (resp) => {
        this.request = resp;
      },
      error: (err) => {
        console.error('Error fetching request:', err);
      },
    });
    // populate products
    this.subscription = this.productSvc.list().subscribe({
      next: (resp) => {
        this.products = resp;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  addLineItem(): void {
    if (!this.newLineItem.product || !this.newLineItem.product.id) {
      alert('Please select a product!');
      return;
    }
    this.newLineItem.product = { id: this.newLineItem.product.id } as Product;
    this.newLineItem.request = { id: this.requestId } as Request;
    console.log('Payload being sent:', this.newLineItem);

    this.subscription = this.lineItemSvc.add(this.newLineItem).subscribe({
      next: () => {
        this.router.navigateByUrl('/request/lines/' + this.requestId);
      },
      error: (err) => {
        console.error('Error adding line item:', err);
        if (err.error) {
          console.error('Error details:', err.error);
        }
      },
    });
  }
}
