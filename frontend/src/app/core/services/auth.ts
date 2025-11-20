import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from './storage';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private storage = inject(StorageService);
  
  private apiUrl = 'http://localhost:8000/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const user = this.storage.getUser();
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login/`, credentials)
      .pipe(
        tap(response => {
          this.storage.setToken(response.access);
          this.storage.setRefreshToken(response.refresh);
          this.storage.setUser(response.user);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  // ⬇️ AGREGA ESTE MÉTODO SI NO EXISTE ⬇️
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register/`, data)
      .pipe(
        tap(response => {
          this.storage.setToken(response.access);
          this.storage.setRefreshToken(response.refresh);
          this.storage.setUser(response.user);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout(): void {
    this.storage.removeTokens();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!this.storage.getToken();
  }

  refreshToken(): Observable<{ access: string }> {
    const refreshToken = this.storage.getRefreshToken();
    return this.http.post<{ access: string }>(
      `${this.apiUrl}/token/refresh/`,
      { refresh: refreshToken }
    ).pipe(
      tap(response => {
        this.storage.setToken(response.access);
      })
    );
  }
}