import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloodRequestService {
  private baseUrl = 'https://bloodbank-api-csbxgsaabfc4bjbn.eastus-01.azurewebsites.net/api/appointments/blood-requests';

  constructor(private http: HttpClient) {}

  submitBloodRequest(userId: number, requestData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit/${userId}`, requestData);
  }

  getBloodRequestHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history`);
  }


  getRequestsByBloodGroup(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/stats/blood-group`);
  }


  getRequestsByUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/stats/user`);
  }


  getRequestsByPriority(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/stats/priority`);
  }

  updateBloodRequestStatus(requestId: number, status: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${requestId}/update-status?status=${status}`, {});
  }
}
