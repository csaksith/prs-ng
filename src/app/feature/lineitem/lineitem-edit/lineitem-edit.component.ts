import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../model/line-item.model';
import { Product } from '../../../model/product.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { LineitemService } from '../../../service/lineitem.service';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-lineitem-edit',
  standalone: false,
  templateUrl: './lineitem-edit.component.html',
  styleUrl: './lineitem-edit.component.css',
})
export class LineitemEditComponent implements OnInit, OnDestroy {
  title: string = 'Line-Item-Edit';
  lineitem: LineItem = new LineItem();
  products: Product[] = [];
  requestId!: number;
  subscription!: Subscription;
  constructor(
    private lineItemSvc: LineitemService,
    private productSvc: ProductService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get lineitem id from URL
    this.actRoute.params.subscribe((parms) => {
      let lineitemId = parms['id'];
      // get line item by id from backend 
      this.subscription = this.lineItemSvc.getById(lineitemId).subscribe({
        next: (resp) => {
          this.lineitem = resp;
          this.requestId = this.lineitem.request.id; // store requestId for later use
        },
        error: (err) => {
          console.error('Error fetching line item:', err);
        },
      });

      // get products for dropdown
      this.subscription = this.productSvc.list().subscribe({
        next: (resp) => {
          this.products = resp;
        },
        error: (err) => {
          console.error('Error fetching products:', err);
        },
      });
    });  
  }

  saveLineItem() {
    this.subscription = this.lineItemSvc.update(this.lineitem).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/request/lines/' + this.requestId); 
      },
      error: (err) => {
        console.error('Error editing line item: ' + err.message);
      },
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
