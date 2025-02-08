import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ItemCart } from '@app/common/item-cart';
import { HeaderUserComponent } from '@app/components/header-user/header-user.component';
import { CartService } from '@app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sumary-order',
  imports: [RouterLink, FormsModule, HeaderUserComponent],
  templateUrl: './sumary-order.component.html',
  styleUrl: './sumary-order.component.css'
})
export class SumaryOrderComponent implements OnInit {

  items: ItemCart[] = [];
  totalCart: number = 0;
  name: string = '';
  email: string = '';
  address: string = '';

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    console.log('first', this.cartService.converToListFromMap())
    this.items = this.cartService.converToListFromMap();
    this.totalCart = this.cartService.totalCart();
  }

  deleteItemCart(productId: number): void {
    this.cartService.removeItemCart(productId);
    this.items = this.cartService.converToListFromMap();
    this.toastr.success('Producto eliminado del carrito');
  }
}
