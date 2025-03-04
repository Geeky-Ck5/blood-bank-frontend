import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloodRequestService {
  private baseUrl = 'https://bloodbank-api-csbxgsaabfc4bjbn.eastus-01.azurewebsites.net/api/appointments/blood-requests';

  constructor(private http: HttpClient) {}

  submitBloodRequest(userId: number, requestData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit/${userId}`, requestData);
  }

  getBloodRequestHistory(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history/${userId}`);
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

  getBloodRequestsForAllUsers(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/stats/user`).pipe(
      switchMap(userCounts => {
        const userIds = Object.keys(userCounts).map(id => Number(id)); // Convert to Number
        const requests$ = userIds.map(userId => this.getBloodRequestHistory(userId));
        return forkJoin(requests$); // Execute all requests in parallel
      })
    );
    }
}
