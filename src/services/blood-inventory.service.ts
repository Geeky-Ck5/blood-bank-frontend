import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BloodInventoryService {
  private baseUrl = 'http://your-backend-api.com/api/blood-inventory'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  /**
   * Fetch the blood inventory levels.
   */
  getBloodInventory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
