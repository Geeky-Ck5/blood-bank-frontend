import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'https://bloodbank-api-csbxgsaabfc4bjbn.eastus-01.azurewebsites.net/api/notifications';

  constructor(private http: HttpClient) {}

  /**
   * ✅ Get Notifications for User
   */
  getNotifications(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }

  /**
   * ✅ Send Notification to a Single User
   */
  sendNotification(userId: number, message: string, type: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/send/${userId}?message=${message}&type=${type}`, {});
  }

  /**
   * ✅ Mark Notification as Read
   */
  markAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/read/${notificationId}`, {});
  }

  /**
   * ✅ Bulk Send Notifications
   */
  sendBulkNotifications(userIds: number[], message: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/bulk-send`, { userIds, message });
  }
}
