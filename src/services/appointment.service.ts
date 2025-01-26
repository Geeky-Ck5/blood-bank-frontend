import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Appointment {
  appointmentId: number;
  userId: number;
  centerName: string;
  date: string;
  time: string;
  status: string;
}


@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8080/api/appointments';

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

  scheduleRecipientAppointment(appointmentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/schedule`, appointmentData);
  }
  getCompletedAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointments/completed`);
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl);
  }

  updateAppointmentStatus(appointmentId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${appointmentId}/status`, { status });
  }

}
