import { Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list';
import { OrderFormComponent } from './order-form/order-form';
import { OrderDetailComponent } from './order-detail/order-detail';

export const ordersRoutes: Routes = [
  {
    path: '',
    component: OrderListComponent
  },
  {
    path: 'new',
    component: OrderFormComponent
  },
  {
    path: 'edit/:id',
    component: OrderFormComponent
  },
  {
    path: 'detail/:id',
    component: OrderDetailComponent
  }
];
