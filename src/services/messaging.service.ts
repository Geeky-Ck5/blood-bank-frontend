import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private baseUrl = 'https://bloodbank-api-csbxgsaabfc4bjbn.eastus-01.azurewebsites.net/api/messages';

  constructor(private http: HttpClient) {
  }

  sendMessage(messageData: { senderId: number; recipientId: number; message: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/send`, messageData);
  }

  getMessagesForUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }

  getConversation(senderId: number, recipientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/conversation?senderId=${senderId}&recipientId=${recipientId}`);
  }

  markMessageAsRead(messageId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/mark-read/${messageId}`, {});
  }

  deleteMessage(messageId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${messageId}`);
  }

  getUnreadMessageCount(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/unread-count/${userId}`);
  }
}
