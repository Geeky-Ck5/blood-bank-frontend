import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AuditTrailService } from '../../services/audit-trail-service.service';
import {IpService} from '../../services/ip-service.service';

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

  constructor(private authService: AuthService, private router: Router, private AuditTrailService: AuditTrailService, private ipService: IpService) {}

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

          // Log successful login
          this.AuditTrailService.captureAuditLog('Login successful', {
            userId: response.userId,
            userRole: response.role,
            performedBy: response.email,
            details: `User ${response.email} logged in successfully.`,
          });

          // Redirect based on role
          const role = response.role;
          if (response.firstname) {
            // Redirect to respective dashboards
            if (response.role === 'donor') {
              window.location.href = '/donor-dashboard';
            } else if (response.role === 'recipient') {
              window.location.href = '/recipient-dashboard';

            } else if (response.role === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              console.error('Unknown role:', response.role);
            }
          } else {
            // Redirect to profile update based on role
            if (response.role === 'donor') {
              window.location.href = '/donor-profile';
            } else if (response.role === 'recipient') {
              window.location.href = '/recipient-profile';
            }
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Invalid credentials. Please try again.');

          // Log failed login
          this.AuditTrailService.captureAuditLog('Login failed', {
            performedBy: this.email,
            details: `Failed login attempt for email: ${this.email}`,
          });
        },
      });
    }

}
