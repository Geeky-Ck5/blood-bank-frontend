import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CentersService {
  private baseUrl = 'http://your-backend-api.com/api/centers';

  constructor(private http: HttpClient) {}

  getCenters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
