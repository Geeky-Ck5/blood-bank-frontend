import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private statsUrl = 'http://localhost:8080/api/dashboard/stats';
  private bloodInventoryUrl = 'http://localhost:8080/api/blood-inventory/summary';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<any> {
    return this.http.get(this.statsUrl);
  }

  getBloodInventorySummary(): Observable<any[]> {
    return this.http.get<any[]>(this.bloodInventoryUrl);
  }

  getExpiryAlerts(): Observable<any[]> {
    const expiryAlertsUrl = 'http://localhost:8080/api/blood-inventory/expiry-alerts';
    return this.http.get<any[]>(expiryAlertsUrl);
  }
}
