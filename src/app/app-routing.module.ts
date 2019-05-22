import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'test',
    loadChildren: './modules/test/test.module#TestModule'
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'details',
    component: CustomerDetailsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'customer',
    component: CreateCustomerComponent
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
