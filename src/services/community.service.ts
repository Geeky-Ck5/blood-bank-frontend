import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunityStoriesService {
  private apiUrl = 'http://localhost:8080/api/community-stories';

  constructor(private http: HttpClient) {}

  /** Fetch all approved stories */
  getApprovedStories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/approved`);
  }

  /** Fetch all stories (for admin use) */
  getAllStories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /** Fetch user-specific stories (to show pending ones) */
  getUserStories(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }

  /** Create a new story */
  createStory(userId: number, title: string, content: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { userId, title, content });
  }

  /** Approve or reject a story (admin action) */
  updateStoryStatus(storyId: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${storyId}/status?status=${status}`, {});
  }

  /** Delete a story (admin action) */
  deleteStory(storyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${storyId}`);
  }
}
