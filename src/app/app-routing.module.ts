import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { ProductCreateComponent } from './feature/product/product-create/product-create.component';
import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';
import { ProductEditComponent } from './feature/product/product-edit/product-edit.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { RequestCreateComponent } from './feature/request/request-create/request-create.component';
import { RequestDetailComponent } from './feature/request/request-detail/request-detail.component';
import { RequestEditComponent } from './feature/request/request-edit/request-edit.component';
import { RequestListComponent } from './feature/request/request-list/request-list.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { UserLoginComponent } from './feature/user/user-login/user-login.component';
import { RequestLinesComponent } from './feature/lineitem/request-lines/request-lines.component';
import { LineitemCreateComponent } from './feature/lineitem/lineitem-create/lineitem-create.component';
import { LineitemEditComponent } from './feature/lineitem/lineitem-edit/lineitem-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/user-login', pathMatch: 'full' }, // redirect to user login
  // user
  { path: 'user-list', component: UserListComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'user-edit/:id', component: UserEditComponent },
  { path: 'user-detail/:id', component: UserDetailComponent },
  // vendor
  { path: 'vendor-list', component: VendorListComponent },
  { path: 'vendor-create', component: VendorCreateComponent },
  { path: 'vendor-edit/:id', component: VendorEditComponent },
  { path: 'vendor-detail/:id', component: VendorDetailComponent },
  // request
  { path: 'request-list', component: RequestListComponent },
  { path: 'request-create', component: RequestCreateComponent },
  { path: 'request-edit/:id', component: RequestEditComponent },
  { path: 'request-detail/:id', component: RequestDetailComponent },
  { path: 'request/lines/:id', component: RequestLinesComponent },
  // product
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-create', component: ProductCreateComponent },
  { path: 'product-edit/:id', component: ProductEditComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  // line item
  { path: 'lineitem-create/:requestId', component: LineitemCreateComponent },
  { path: 'lineitem-edit/:id', component: LineitemEditComponent },
  // default route
  { path: 'user-login', component: UserLoginComponent }, // login page (for now, just user list)
  { path: '**', redirectTo: 'user-list' }, // wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
