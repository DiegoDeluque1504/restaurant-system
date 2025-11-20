import { Routes } from '@angular/router';
import { DishListComponent } from './dish-list/dish-list';  // ← Cambiar DishList a DishListComponent
import { DishFormComponent } from './dish-form/dish-form';

export const dishesRoutes: Routes = [
  { path: '', component: DishListComponent },  // ← Aquí también
  { path: 'new', component: DishFormComponent },
  { path: 'edit/:id', component: DishFormComponent }
];
