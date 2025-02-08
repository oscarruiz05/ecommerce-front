import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ItemCart } from '@app/common/item-cart';
import { Product } from '@app/common/product';
import { HeaderUserComponent } from '@app/components/header-user/header-user.component';
import { CartService } from '@app/services/cart.service';
import { ProductService } from '@app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-product',
  imports: [RouterLink, FormsModule, HeaderUserComponent],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent implements OnInit {

  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  urlImage: string = '';
  quantity: number = 0;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.productService.getProduct(id).subscribe((data: Product) => {
          this.id = data.id;
          this.name = data.name;
          this.description = data.description;
          this.price = data.price;
          this.urlImage = data.image;
        });
      }
    })
  }

  addCart(id: number): void {
    const item = new ItemCart(id, this.name, this.quantity, this.price);
    this.cartService.addItemCart(item);
    this.toastr.success('Producto agregado al carrito', this.name);
  }
}
