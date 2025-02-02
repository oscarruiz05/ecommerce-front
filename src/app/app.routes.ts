import { Routes } from '@angular/router';
import { ProductListComponent } from '@app/components/product-list/product-list.component';
import { HomeComponent } from '@app/components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin/products',
    component: ProductListComponent
  }
];
