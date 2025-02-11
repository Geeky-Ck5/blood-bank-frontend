import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IpService} from './ip-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuditTrailService {
  private baseUrl = '/api/audit-trail';

  constructor(private http: HttpClient, private ipService: IpService) {}

  /**
   * Capture an audit log for a specific action performed by a user.
   * @param actionPerformed Action description (e.g., "Login successful").
   * @param extraDetails Optional extra details (e.g., userId, performedBy, etc.).
   */
  captureAuditLog(
    actionPerformed: string,
    extraDetails: Partial<{
      userId: number | null;
      userRole: string | null;
      performedBy: string;
      details: string;
    }> = {}
  ): void {
    this.ipService.getIpDetails().subscribe({
      next: (data) => {
        const formattedLocation = `${data.city}, ${data.region}, ${data.country}`;

        const auditLog = {
          userId: extraDetails.userId || null,
          userRole: extraDetails.userRole || 'guest',
          actionPerformed,
          ipAddress: data.ip || 'Unknown', // Ensure IP is assigned
          performedBy: extraDetails.performedBy || 'Unknown',
          details: extraDetails.details || 'User action performed.',
          userAgent: navigator.userAgent,
          location: formattedLocation || 'Unknown', // Ensure location is assigned
        };

        // Ensure we save after getting IP
        this.saveAuditLog(auditLog).subscribe({
          next: () => console.log('Audit log saved successfully.'),
          error: (err) => console.error('Failed to save audit log:', err),
        });
      },
      error: (err) => {
        console.error('Failed to fetch IP and location:', err);

        const fallbackAuditLog = {
          userId: extraDetails.userId || null,
          userRole: extraDetails.userRole || 'guest',
          actionPerformed,
          ipAddress: 'Unknown',
          performedBy: extraDetails.performedBy || 'Unknown',
          details: extraDetails.details || 'User action performed.',
          userAgent: navigator.userAgent,
          location: 'Unknown',
        };

        this.saveAuditLog(fallbackAuditLog).subscribe({
          next: () => console.log('Audit log saved with fallback values.'),
          error: (err) => console.error('Failed to save fallback audit log:', err),
        });
      },
    });
  }

  /**
   * Save an audit log to the backend.
   * @param auditLog The audit log object.
   */
  saveAuditLog(auditLog: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, auditLog);
  }

  // Get all logs
  getAllLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // Get logs by user ID
  getLogsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }

  // Get logs by action
  getLogsByAction(action: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/action/${action}`);
  }

  // Get logs by user role
  getLogsByRole(role: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/role/${role}`);
  }
}
