import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Delivery } from '../core/models/delivery.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveriesService {

  private apiUrl = `${environment.apiUrl}/decorator/deliveries/`;

  constructor(private http: HttpClient) {}

  getDeliveries() {
    return this.http.get<Delivery[]>(this.apiUrl);
  }

  getDelivery(id: number) {
    return this.http.get<Delivery>(`${this.apiUrl}${id}/`);
  }

  createDelivery(data: Delivery) {
    return this.http.post<Delivery>(this.apiUrl, data);
  }
}

