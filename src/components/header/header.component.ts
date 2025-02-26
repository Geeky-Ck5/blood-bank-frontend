import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { AuditTrailService } from '../../services/audit-trail-service.service';
import { IpService } from '../../services/ip-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  firstName: string | null = null;
  role: string | null = null;

  constructor(private router: Router, private auditTrailService: AuditTrailService, private ipService: IpService) {}

  ngOnInit() {
    this.checkLoginState();
  }

  /**
   * Check if the user is logged in based on localStorage.
   */
  checkLoginState() {
    const token = localStorage.getItem('token'); // Use token instead of firstName
    this.firstName = localStorage.getItem('firstName');
    this.role = localStorage.getItem('role');
    this.isLoggedIn = !!token; // If token exists, user is logged in
  }

  /**
   * Log out the user by clearing session storage and redirecting to home.
   */
  logout() {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role') || 'guest';
    const email = localStorage.getItem('email') || 'Unknown';

    // Fetch IP and Location before logging out
    this.ipService.getIpDetails().subscribe({
      next: (data) => {
        const formattedLocation = `${data.city}, ${data.region}, ${data.country}`;

        // Capture logout action in audit logs
        this.auditTrailService.captureAuditLog('Logout', {
          userId: userId ? parseInt(userId) : null,
          userRole: role,
          performedBy: email,
          details: `User ${email} logged out.`,
          ipAddress: data.ip,
          location: formattedLocation,
        });

        // Clear session and update UI state
        this.clearSessionAndRedirect();
      },
      error: () => {
        // If IP fetch fails, log with "Unknown"
        this.auditTrailService.captureAuditLog('Logout', {
          userId: userId ? parseInt(userId) : null,
          userRole: role,
          performedBy: email,
          details: `User ${email} logged out.`,
          ipAddress: 'Unknown',
          location: 'Unknown',
        });

        // Clear session and update UI state
        this.clearSessionAndRedirect();
      }
    });
  }

  /**
   * Navigate to the correct dashboard based on the user's role.
   */
  goToDashboard() {
    if (this.role === 'donor') {
      window.location.href = '/donor-dashboard';
    } else if (this.role === 'recipient') {
      window.location.href = '/recipient-dashboard';
    } else if (this.role === 'admin') {
      window.location.href = '/admin';
    }
  }

  private clearSessionAndRedirect() {
    localStorage.clear(); // ✅ More efficient than removing each item manually
    this.isLoggedIn = false;
    this.firstName = null;
    this.role = null;

    this.router.navigate(['/login']);
  }
}
