import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Product } from '@app/common/product';
import { ProductService } from '@app/services/product.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  year: number = new Date().getFullYear();

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      error => console.error(error)
    );
  }
}
