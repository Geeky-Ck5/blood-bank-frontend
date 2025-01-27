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
      next: (data: { ip: any; location: any; }) => {
        // Prepare the audit log object
        const auditLog = {
          userId: extraDetails.userId || null,
          userRole: extraDetails.userRole || 'guest',
          actionPerformed,
          ipAddress: data.ip,
          performedBy: extraDetails.performedBy || 'Unknown',
          details: extraDetails.details || 'User action performed.',
          userAgent: navigator.userAgent,
          location: data.location, // Fetched location
        };

        // Save the audit log
        this.saveAuditLog(auditLog).subscribe({
          next: () => console.log('Audit log saved successfully.'),
          error: (err) => console.error('Failed to save audit log:', err),
        });
      },
      error: (err: any) => {
        console.error('Failed to fetch IP and location:', err);

        // Prepare a fallback audit log
        const auditLog = {
          userId: extraDetails.userId || null,
          userRole: extraDetails.userRole || 'guest',
          actionPerformed,
          ipAddress: 'Unknown',
          performedBy: extraDetails.performedBy || 'Unknown',
          details: extraDetails.details || 'User action performed.',
          userAgent: navigator.userAgent,
          location: 'Unknown',
        };

        // Save the audit log
        this.saveAuditLog(auditLog).subscribe({
          next: () => console.log('Audit log saved successfully with default values.'),
          error: (err) => console.error('Failed to save audit log:', err),
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
