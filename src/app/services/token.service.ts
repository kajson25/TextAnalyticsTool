import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly tokenKey = '929931ca479c4ad0b6375b2c6c78fcd8';

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isTokenAvailable(): boolean {
    const token = this.getToken();
    return token !== null && token.trim() !== '';
  }
}

