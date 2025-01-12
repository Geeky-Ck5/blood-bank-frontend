import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseUrl = 'http://your-backend-api.com/api/appointments';

  constructor(private http: HttpClient) {}

  scheduleAppointment(appointmentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/schedule`, appointmentData);
  }

  getUpcomingAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/upcoming`);
  }

  getPastAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/past`);
  }

  cancelAppointment(appointmentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cancel/${appointmentId}`);
  }
}
