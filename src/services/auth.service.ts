import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '/api'; // Base API URL

  constructor(private http: HttpClient) {}

  // Login method
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // Signup method
  signup(userData: { email: string; password: string }): Observable<any> {
    return this.http.post<string>(`${this.baseUrl}/signup`, userData, {
      responseType: 'text' as 'json', // Interpret plain text as JSON
    });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }

  // Token-based methods for token generation, validation, and regeneration
  generateToken(payload: { email: string }): Observable<string> {
    return this.http.post(`${this.baseUrl}/auth/generate-token`, payload, {
      responseType: 'text',
    }) as Observable<string>;
  }

  validateToken(tokenData: { email: string; token: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/validate-token`, tokenData);
  }

  regenerateToken(emailData: { email: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/regenerate-token`, emailData);
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

  // Profile management for donors and recipients
  saveUserProfile(profileData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/save-profile`, profileData);
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`);
  }

  updateProfile(profile: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/profile`, profile); // Adjust the endpoint if necessary
  }

  changePassword(passwordData: { currentPassword: string; newPassword: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/change-password`, passwordData);
  }

  // Recipient-specific methods
  registerRecipient(recipientData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/recipient/register`, recipientData);
  }

  getRecipientProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/recipient/profile`);
  }

  updateRecipientProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/auth/recipient/profile`, profileData);
  }

  // Eligibility reminders for donors
  getEligibilityReminders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/donor/eligibility`);
  }

  // Preferred center management
  savePreferredCenter(centerId: number): Observable<any> {
    return this.updateProfile({ preferredCenter: centerId });
  }

  // Enable or disable auto-reminders for eligibility
  updateAutoReminders(autoReminders: boolean): Observable<any> {
    return this.updateProfile({ autoReminders });
  }

  resetPassword(data: { email: string; token: number; newPassword: string }): Observable<string> {
    return this.http.post(`${this.baseUrl}/reset-password`, data, { responseType: 'text' });
  }


  resetFailedLogin(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-failed-login`, { email });
  }

  sendResetPasswordToken(data: { email: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, data);
  }

}
