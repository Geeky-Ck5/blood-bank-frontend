import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuditTrailService } from '../../services/audit-trail-service.service';
import { IpService } from '../../services/ip-service.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private auditTrailService: AuditTrailService,
    private ipService: IpService
  ) {}

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        // Store token and user details
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('role', response.role);
        localStorage.setItem('email', response.email);
        localStorage.setItem('firstName', response.firstName);

        // Log successful login
        this.auditTrailService.captureAuditLog('Login successful', {
          userId: response.userId,
          userRole: response.role,
          performedBy: response.email,
          details: `User ${response.email} logged in successfully.`,
        });

        // Redirect based on profile completion and role
        if (response.firstName && response.firstName.trim() !== '') {
          // If profile is complete, go to the dashboard
          switch (response.role) {
            case 'donor':
              this.router.navigate(['/donor-dashboard']);
              break;
            case 'recipient':
              this.router.navigate(['/recipient-dashboard']);
              break;
            case 'admin':
              this.router.navigate(['/admin']);
              break;
            default:
              console.error('Unknown role:', response.role);
          }
        } else {
          // If profile is incomplete, redirect to profile update
          switch (response.role) {
            case 'donor':
              this.router.navigate(['/donor-profile']);
              break;
            case 'recipient':
              this.router.navigate(['/recipient-profile']);
              break;
            default:
              console.error('Unknown role:', response.role);
          }
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid credentials. Please try again.');

        // Log failed login
        this.auditTrailService.captureAuditLog('Login failed', {
          performedBy: this.email,
          details: `Failed login attempt for email: ${this.email}`,
        });
      },
    });
  }
}
