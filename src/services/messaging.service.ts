import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private baseUrl = 'http://localhost:8080/api/messages';

  constructor(private http: HttpClient) {}

  /**
   * Send a message from a user to another user
   * @param senderId - ID of the sender
   * @param recipientId - ID of the recipient
   * @param message - Message content
   */
  sendMessage(senderId: number, recipientId: number, message: string): Observable<any> {
    const payload = { senderId, recipientId, message };
    return this.http.post(`${this.baseUrl}/send`, payload);
  }

  /**
   * Get all messages for a specific user
   * @param userId - ID of the user
   */
  getMessagesForUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }

  /**
   * Get conversation between two users
   * @param senderId - ID of the sender
   * @param recipientId - ID of the recipient
   */
  getConversation(senderId: number, recipientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/conversation?senderId=${senderId}&recipientId=${recipientId}`);
  }

  /**
   * Mark a specific message as read
   * @param messageId - ID of the message
   */
  markMessageAsRead(messageId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/mark-read/${messageId}`, {});
  }

  /**
   * Delete a message
   * @param messageId - ID of the message
   */
  deleteMessage(messageId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${messageId}`);
  }
}
