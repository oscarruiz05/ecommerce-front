import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from '@app/common/product';
import { ProductService } from '@app/services/product.service';
import { HeaderAdminComponent } from '@app/components/header-admin/header-admin.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, HeaderAdminComponent],
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

  deleteProduct(productId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe(() => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
          this.listProducts();
        });
      }
    });
  }
}
