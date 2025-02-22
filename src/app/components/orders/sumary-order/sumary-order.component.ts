import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataPayment } from '@app/common/data-payment';
import { ItemCart } from '@app/common/item-cart';
import { Order } from '@app/common/order';
import { OrderProduct } from '@app/common/order-product';
import { OrderState } from '@app/common/order-state';
import { User } from '@app/common/user';
import { HeaderUserComponent } from '@app/components/header-user/header-user.component';
import { CartService } from '@app/services/cart.service';
import { OrderService } from '@app/services/order.service';
import { PaymentServiceService } from '@app/services/payment-service.service';
import { SessionStorageService } from '@app/services/session-storage.service';
import { UserService } from '@app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sumary-order',
  imports: [RouterLink, FormsModule, HeaderUserComponent],
  templateUrl: './sumary-order.component.html',
  styleUrl: './sumary-order.component.css',
})
export class SumaryOrderComponent implements OnInit {
  items: ItemCart[] = [];
  totalCart: number = 0;
  name: string = '';
  email: string = '';
  address: string = '';

  orderProducts: OrderProduct[] = [];
  userId: number = 1;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService,
    private paymentService: PaymentServiceService,
    private sessionStorageService: SessionStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.converToListFromMap();
    this.totalCart = this.cartService.totalCart();
    this.getUserById(1);
  }

  generateOrder(): void {
    this.items.forEach((item: ItemCart) => {
      const orderProduct = new OrderProduct(null, item.productId, item.quantity, item.price);
      this.orderProducts.push(orderProduct);
    });
    const order = new Order(null, new Date(), this.orderProducts, this.userId, OrderState.CANCELLED);
    this.orderService.createOrder(order).subscribe((data: Order) => {
      this.toastr.success('Orden generada con éxito');
      this.sessionStorageService.setItem('order', data);
    });

    // redireccionar a la página de pago
    let urlPayment: string = '';
    let dataPayment = new DataPayment('PAYPAL', this.totalCart.toString(), 'USD', 'Compra de productos');
    this.paymentService.getUrlPaypalPayment(dataPayment).subscribe((response) => {
      urlPayment = response.url;
      window.location.href = urlPayment;
    });
  }

  deleteItemCart(productId: number): void {
    this.cartService.removeItemCart(productId);
    this.items = this.cartService.converToListFromMap();
    this.toastr.success('Producto eliminado del carrito');
  }

  getUserById(userId: number): void {
    this.userService.getUser(userId).subscribe((user: User) => {
      this.name = user.name;
      this.email = user.email;
      this.address = user.address;
    });
  }
}
