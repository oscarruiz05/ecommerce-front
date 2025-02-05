import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderAdminComponent } from '@app/components/header-admin/header-admin.component';
import { CategoryService } from '@app/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-add',
  imports: [HeaderAdminComponent, FormsModule],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css',
})
export class CategoryAddComponent implements OnInit {
  id: number = 0;
  name: string = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.id = id;
        this.getCategory();
      }
    });
  }

  saveCategory() {
    if (this.id === 0) {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }

  createCategory() {
    this.categoryService
      .createCategory({ id: this.id, name: this.name })
      .subscribe(() => {
        this.toastrService.success('Category created successfully', 'Category');
        this.router.navigate(['/admin/categories']);
      });
  }

  getCategory() {
    this.categoryService.getCategory(this.id).subscribe((category) => {
      this.id = category.id;
      this.name = category.name;
    });
  }

  updateCategory() {
    this.categoryService
      .updateCategory({ id: this.id, name: this.name }, this.id)
      .subscribe(() => {
        this.toastrService.success('Category updated successfully', 'Category');
        this.router.navigate(['/admin/categories']);
      });
  }
}
