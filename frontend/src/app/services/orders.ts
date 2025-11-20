import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Order } from '../core/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl = `${environment.apiUrl}/apiview/orders/`;

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrder(id: number) {
    return this.http.get<Order>(`${this.apiUrl}${id}/`);
  }

  createOrder(data: Order) {
    return this.http.post<Order>(this.apiUrl, data);
  }
}
