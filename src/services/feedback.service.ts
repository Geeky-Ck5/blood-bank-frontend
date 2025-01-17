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
}
