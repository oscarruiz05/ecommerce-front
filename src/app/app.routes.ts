import { Routes } from '@angular/router';
import { ProductListComponent } from '@app/components/product-list/product-list.component';
import { HomeComponent } from '@app/components/home/home.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryAddComponent } from './components/category/category-add/category-add.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin/products',
    component: ProductListComponent
  },
  {
    path: 'admin/products/add',
    component: ProductAddComponent
  },
  {
    path: 'admin/products/edit/:id',
    component: ProductAddComponent
  },
  {
    path: 'admin/categories',
    component: CategoryListComponent
  },
  {
    path: 'admin/categories/add',
    component: CategoryAddComponent
  },
  {
    path: 'admin/categories/edit/:id',
    component: CategoryAddComponent
  },
];
