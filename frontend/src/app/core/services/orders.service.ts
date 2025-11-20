import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/apiview/orders`;

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/`);
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}/`);
  }

  create(data: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/`, data);
  }

  update(id: number, data: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}/`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }
}