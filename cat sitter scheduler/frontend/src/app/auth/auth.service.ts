import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {
    // Load the token from localStorage on service initialization
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.tokenSubject.next(storedToken);
    }
  }

  // Set token
  setToken(token: string): void {
    this.tokenSubject.next(token);
    localStorage.setItem('token', token);  // Store the token in localStorage
  }

  // Get token observable
  getToken() {
    return this.tokenSubject.asObservable();
  }

  // Clear token
  clearToken(): void {
    this.tokenSubject.next(null);
    localStorage.removeItem('token');  // Remove the token from localStorage
  }

  // Check if the user is authenticated (based on token presence)
  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }
}
