import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseUrl = 'http://your-backend-api.com/api/events';

  constructor(private http: HttpClient) {}

  getNearbyEvents(lat: number, lng: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/nearby?lat=${lat}&lng=${lng}`);
  }

  registerForEvent(eventId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/register/${eventId}`, {});
  }
}
