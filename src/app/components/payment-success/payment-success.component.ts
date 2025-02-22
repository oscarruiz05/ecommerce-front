import { Component, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { SessionStorageService } from '@app/services/session-storage.service';
import { OrderService } from '@app/services/order.service';
import { OrderState } from '@app/common/order-state';

@Component({
  selector: 'app-payment-success',
  imports: [HeaderUserComponent],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private sessionStorageService: SessionStorageService,
  ) { }

  ngOnInit(): void {
    this.updateOrder();
  }

  updateOrder(): void {
    const order = this.sessionStorageService.getItem('order');
    const formData = new FormData();
    formData.append('id', order.id);
    formData.append('state', OrderState.CONFIRMED.toString());
    this.orderService.updateOrder(formData).subscribe((response) => {
      console.log("🚀 ~ PaymentSuccessComponent ~ this.orderService.updateOrder ~ response:", response)
      this.sessionStorageService.removeItem('order');
    });
  }
}
