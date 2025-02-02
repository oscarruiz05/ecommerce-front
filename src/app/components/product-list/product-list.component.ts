import { Component, OnInit } from '@angular/core';
import { Product } from '@app/common/product';
import { ProductService } from '@app/services/product.service';
import { HeaderAdminComponent } from '@app/components/header-admin/header-admin.component';

@Component({
  selector: 'app-product-list',
  imports: [HeaderAdminComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(): void {
    this.productService
      .getProducts()
      .subscribe((data) => (this.products = data));
  }
}
