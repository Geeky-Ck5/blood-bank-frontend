import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://bloodbank-api-csbxgsaabfc4bjbn.eastus-01.azurewebsites.net/api';

  constructor(private http: HttpClient) {}

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/${userId}`);
  }
}
