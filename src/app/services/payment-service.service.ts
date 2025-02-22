import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataPayment } from '@app/common/data-payment';
import { UrlPaypalResponse } from '@app/common/url-paypal-response';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  private apiUrl: string = `${environment.apiUrl}/v1/payments`;

  constructor(private http: HttpClient) { }

  getUrlPaypalPayment(dataPayment: DataPayment) {
    return this.http.post<UrlPaypalResponse>(`${this.apiUrl}`, dataPayment);
  }
}
