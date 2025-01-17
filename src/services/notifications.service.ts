import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private baseUrl = 'http://your-backend-api.com/api/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(role: 'donor' | 'recipient'): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${role}`);
  }

  markNotificationAsRead(notificationId: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/mark-as-read/${notificationId}`, {});
  }

  getEligibilityReminders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/donor/eligibility`);
  }
}
