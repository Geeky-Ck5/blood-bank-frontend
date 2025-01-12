import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Makes this service available application-wide
})
export class AuthService {
  private baseUrl = 'http://your-backend-api.com/api/auth'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  // Signup method
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, userData);
  }

  // Forgot password method
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }

  // Store the token
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Retrieve the token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Clear the token (e.g., on logout)
  clearToken(): void {
    localStorage.removeItem('authToken');
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
