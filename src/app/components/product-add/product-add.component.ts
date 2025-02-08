import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/services/product.service';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@app/common/product';
import { ToastrService } from 'ngx-toastr';
import { Category } from '@app/common/category';
import { CategoryService } from '@app/services/category.service';

@Component({
  selector: 'app-product-add',
  imports: [FormsModule, HeaderAdminComponent],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent implements OnInit {
  id: number = 0;
  code: string = '';
  name: string = '';
  description: string = '';
  price: number = 0;
  imageUrl: string = '';
  userId: number = 1;
  categoryId: number = 1;

  selectFile: File | null = null;

  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.getProduct(id);
      }
    });
  }

  saveProduct(): void {
    if (this.id) {
      this.editProduct();
    } else {
      this.addProduct();
    }
  }

  addProduct(): void {
    const formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('code', this.code);
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('imageUrl', this.imageUrl);
    formData.append('image', this.selectFile as Blob);
    formData.append('userId', this.userId.toString());
    formData.append('categoryId', this.categoryId.toString());

    this.productService.createProduct(formData).subscribe(() => {
      this.toastr.success('Producto creado correctamente!', 'Producto');
      this.router.navigate(['/admin/products']);
    });
  }

  getProduct(productId: number): void {
    this.productService.getProduct(productId).subscribe((product: Product) => {
      this.id = product.id;
      this.code = product.code;
      this.name = product.name;
      this.description = product.description;
      this.price = product.price;
      this.imageUrl = product.image;
      this.userId = product.userId;
      this.categoryId = product.categoryId;
    });
  }

  editProduct(): void {
    const formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('code', this.code);
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('imageUrl', this.imageUrl);
    formData.append('image', this.selectFile as Blob);
    formData.append('userId', this.userId.toString());
    formData.append('categoryId', this.categoryId.toString());

    this.productService.updateProduct(formData, this.id).subscribe(() => {
      this.toastr.success('Producto actualizado correctamente!', 'Producto');
      this.router.navigate(['/admin/products']);
    });
  }

  onFileSelected(event: any): void {
    this.selectFile = event.target.files[0];
  }

  getCategories(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories: Category[]) => (this.categories = categories));
  }
}
