import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Table } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/viewset/tables`;

  getAll(): Observable<Table[]> {
    return this.http.get<any>(`${this.apiUrl}/`).pipe(
      map(response => response.results || response)
    );
  }

  getById(id: number): Observable<Table> {
    return this.http.get<Table>(`${this.apiUrl}/${id}/`);
  }

  updateStatus(id: number, status: Table['status']): Observable<Table> {
    return this.http.patch<Table>(`${this.apiUrl}/${id}/`, { status });
  }
}