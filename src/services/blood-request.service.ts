import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloodRequestService {
  private baseUrl = 'http://your-backend-api.com/api/blood-requests';

  constructor(private http: HttpClient) {}

  submitBloodRequest(requestData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, requestData);
  }

  getBloodRequestHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history`);
  }
}
