import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly tokenKey = '929931ca479c4ad0b6375b2c6c78fcd8';

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Save the token to localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Clear the token from localStorage (if needed)
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
