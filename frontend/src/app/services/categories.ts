import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Category } from '../core/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = `${environment.apiUrl}/viewset/categories/`;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategory(id: number) {
    return this.http.get<Category>(`${this.apiUrl}${id}/`);
  }

  createCategory(data: Category) {
    return this.http.post<Category>(this.apiUrl, data);
  }

  updateCategory(id: number, data: Category) {
    return this.http.put<Category>(`${this.apiUrl}${id}/`, data);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}

