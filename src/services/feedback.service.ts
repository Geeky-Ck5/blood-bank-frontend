import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'http://your-backend-api.com/api/feedback';

  constructor(private http: HttpClient) {}

  submitFeedback(feedbackData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, feedbackData);
  }

  getAllFeedback(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  addAdminResponse(feedbackId: number, response: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${feedbackId}/response`, { response });
  }
}
