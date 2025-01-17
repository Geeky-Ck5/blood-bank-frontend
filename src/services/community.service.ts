import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private baseUrl = 'http://your-backend-api.com/api/community';

  constructor(private http: HttpClient) {}

  getCommunityStories(role: 'donor' | 'recipient'): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/stories/${role}`);
  }

  shareCommunityStory(role: 'donor' | 'recipient', storyData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/stories/${role}`, storyData);
  }
}
