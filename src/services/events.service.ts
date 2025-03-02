import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) {}

  /**
   * Get nearby events based on latitude and longitude.
   */
  getNearbyEvents(lat: number, lng: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/nearby?lat=${lat}&lng=${lng}`);
  }

  /**
   * Register for a specific event.
   */
  registerForEvent(eventId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/register/${eventId}`, {});
  }

  /**
   * Fetch all upcoming donation events.
   */
  getUpcomingEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/upcoming`);
  }
}
