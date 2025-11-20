import { Routes } from '@angular/router';
import { CategoryList } from './category-list/category-list';
import { CategoryForm } from './category-form/category-form';

export const categoriesRoutes: Routes = [
  {
    path: '',
    component: CategoryList
  },
  {
    path: 'new',
    component: CategoryForm
  },
  {
    path: 'edit/:id',
    component: CategoryForm
  }
];
