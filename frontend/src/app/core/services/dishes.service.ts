import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Dish } from '../models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/generic/dishes`;

  getAll(): Observable<Dish[]> {
    return this.http.get<any>(`${this.apiUrl}/`).pipe(
      map(response => {
        // Si la respuesta tiene "results", es paginada
        if (response.results) {
          return response.results;
        }
        // Si no, devolver la respuesta completa
        return response;
      })
    );
  }

  getById(id: number): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiUrl}/${id}/`);
  }

  create(data: Dish): Observable<Dish> {
    return this.http.post<Dish>(`${this.apiUrl}/`, data);
  }

  update(id: number, data: Dish): Observable<Dish> {
    return this.http.put<Dish>(`${this.apiUrl}/${id}/`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }
}