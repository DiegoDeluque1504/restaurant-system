import { Routes } from '@angular/router';
import { DeliveryListComponent } from './delivery-list/delivery-list';
import { DeliveryFormComponent } from './delivery-form/delivery-form';

export const deliveriesRoutes: Routes = [
  { path: '', component: DeliveryListComponent },
  { path: 'new', component: DeliveryFormComponent }
];