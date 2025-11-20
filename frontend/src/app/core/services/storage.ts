import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage = localStorage;

  set(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    const item = this.storage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  setToken(token: string): void {
    this.set('access_token', token);
  }

  getToken(): string | null {
    return this.get<string>('access_token');
  }

  setRefreshToken(token: string): void {
    this.set('refresh_token', token);
  }

  getRefreshToken(): string | null {
    return this.get<string>('refresh_token');
  }

  removeTokens(): void {
    this.remove('access_token');
    this.remove('refresh_token');
    this.remove('user');
  }

  setUser(user: any): void {
    this.set('user', user);
  }

  getUser(): any {
    return this.get('user');
  }
}