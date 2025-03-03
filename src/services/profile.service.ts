import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'https://bloodbank-api-csbxgsaabfc4bjbn.eastus-01.azurewebsites.net/api/user'; // Adjust base URL as needed

  constructor(private http: HttpClient) {}

  getPreferredCenter(): Observable<any> {
    return this.http.get(`${this.baseUrl}/preferred-center`);
  }

  savePreferredCenter(centerId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/preferred-center`, { centerId });
  }
}
