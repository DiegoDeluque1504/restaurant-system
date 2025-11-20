import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Dish } from '../core/models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  private apiUrl = `${environment.apiUrl}/generic/dishes/`;

  constructor(private http: HttpClient) {}

  getDishes() {
    return this.http.get<Dish[]>(this.apiUrl);
  }

  getDish(id: number) {
    return this.http.get<Dish>(`${this.apiUrl}${id}/`);
  }

  createDish(data: Dish) {
    return this.http.post<Dish>(this.apiUrl, data);
  }

  updateDish(id: number, data: Dish) {
    return this.http.put<Dish>(`${this.apiUrl}${id}/`, data);
  }

  deleteDish(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}

