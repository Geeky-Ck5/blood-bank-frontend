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

  saveUserProfile(profileData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/save-profile`, profileData);
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`);
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/profile`, profileData);
  }
  changePassword(passwordData: { currentPassword: string; newPassword: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/change-password`, passwordData);
  }
  registerRecipient(recipientData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/recipient/register`, recipientData);
  }

  getRecipientProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/recipient/profile`);
  }

  updateRecipientProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/auth/recipient/profile`, profileData);
  }
}
