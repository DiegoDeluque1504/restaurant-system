import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Delivery, DeliveryPerson } from '../models/delivery.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveriesService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/decorator/deliveries`;
  private personsUrl = `${environment.apiUrl}/decorator/delivery-persons`;

  getAll(): Observable<Delivery[]> {
    return this.http.get<any>(`${this.apiUrl}/`).pipe(
      map(response => response.results || response)
    );
  }

  getById(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.apiUrl}/${id}/`);
  }

  create(data: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(`${this.apiUrl}/`, data);
  }

  update(id: number, data: Delivery): Observable<Delivery> {
    return this.http.put<Delivery>(`${this.apiUrl}/${id}/`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }

  getAllPersons(): Observable<DeliveryPerson[]> {
    return this.http.get<any>(`${this.personsUrl}/`).pipe(
      map(response => response.results || response)
    );
  }
}