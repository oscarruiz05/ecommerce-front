import { Routes } from '@angular/router';
import { ProductListComponent } from '@app/components/product-list/product-list.component';
import { HomeComponent } from '@app/components/home/home.component';
import { ProductAddComponent } from './components/product-add/product-add.component';

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
];
