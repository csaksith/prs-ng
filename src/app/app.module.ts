import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';
import { RequestListComponent } from './feature/request/request-list/request-list.component';
import { RequestCreateComponent } from './feature/request/request-create/request-create.component';
import { RequestEditComponent } from './feature/request/request-edit/request-edit.component';
import { RequestDetailComponent } from './feature/request/request-detail/request-detail.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { ProductCreateComponent } from './feature/product/product-create/product-create.component';
import { ProductEditComponent } from './feature/product/product-edit/product-edit.component';
import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';
import { MenuComponent } from './core/menu/menu.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserLoginComponent } from './feature/user/user-login/user-login.component';
import { RequestLinesComponent } from './feature/lineitem/request-lines/request-lines.component';
// Corrected path to LineitemCreateComponent
import { LineitemCreateComponent } from './feature/lineitem/lineitem-create/lineitem-create.component';
import { LineitemEditComponent } from './feature/lineitem/lineitem-edit/lineitem-edit.component';
import { ReviewListComponent } from './feature/request/review-list/review-list.component';
import { RequestApproveComponent } from './feature/request/request-approve/request-approve.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    UserDetailComponent,
    VendorListComponent,
    VendorCreateComponent,
    VendorEditComponent,
    VendorDetailComponent,
    RequestListComponent,
    RequestCreateComponent,
    RequestEditComponent,
    RequestDetailComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductDetailComponent,
    MenuComponent,
    UserLoginComponent,
    RequestLinesComponent,
    LineitemCreateComponent,
    LineitemEditComponent,
    ReviewListComponent,
    RequestApproveComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
