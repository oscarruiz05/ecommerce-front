import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '@app/common/category';
import { HeaderAdminComponent } from '@app/components/header-admin/header-admin.component';
import { CategoryService } from '@app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  imports: [HeaderAdminComponent, RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  deleteCategory(categoryId: number): void {
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
        this.categoryService
          .deleteCategory(categoryId)
          .subscribe(() => this.getCategories());
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  }
}
