import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { AuditTrailService } from '../../services/audit-trail-service.service';
import { IpService } from '../../services/ip-service.service';
import { MessagingService } from '../../services/messaging.service';

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
  unreadMessages: number = 0;
  role: string | null = null;
  userId: number | null = null;

  constructor(private router: Router, private auditTrailService: AuditTrailService, private ipService: IpService, private messagingService: MessagingService) { }

  ngOnInit() {
    this.checkLoginState();
    // Listen for storage changes (fixes login state issue)
    window.addEventListener('storage', () => {
      this.checkLoginState();
    });
  }

  /**
   * Check if the user is logged in based on localStorage.
   */
  checkLoginState() {
    const token = localStorage.getItem('token'); // Use token instead of firstName
    this.firstName = localStorage.getItem('firstName') || 'User';
    this.role = localStorage.getItem('role');
    this.isLoggedIn = !!token; // If token exists, user is logged in
    this.loadUnreadMessages();
  }

  loadUnreadMessages() {
    if (this.userId) {
      this.messagingService.getUnreadMessageCount(this.userId).subscribe({
        next: (count: number) => {
          this.unreadMessages = count;
        },
        error: (err: any) => {
          console.error('Error fetching unread messages:', err);
        }
      });
    }
  }
  goToDashboard() {
    if (this.profileIncomplete()) {
      this.redirectToProfile();
    } else {
      switch (this.role) {
        case 'donor':
          window.location.href = '/donor-dashboard';
          break;
        case 'recipient':
          window.location.href = '/recipient-dashboard';
          break;
        case 'admin':
          window.location.href = '/admin';
          break;
        default:
          console.error('Unknown role:', this.role);
      }
    }
  }

  profileIncomplete(): boolean {
    return !localStorage.getItem('firstName') || localStorage.getItem('firstName') === '';
  }

  redirectToProfile() {
    if (this.role === 'donor') {
      window.location.href = '/donor-profile';
    } else if (this.role === 'recipient') {
      window.location.href = '/recipient-profile';
    }
  }

  goToRequest() {
    if (this.role === 'donor') {
      window.location.href = '/donor/blood-request/new';
    } else if (this.role === 'recipient') {
      window.location.href = '/recipient/blood-request/new';
    }
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

  private clearSessionAndRedirect() {
    localStorage.clear(); // ✅ More efficient than removing each item manually
    this.isLoggedIn = false;
    this.firstName = null;
    this.role = null;

    window.location.href = '/login';
  }
}
