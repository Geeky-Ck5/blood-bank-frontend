import { Component, OnInit} from '@angular/core';
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
export class LandingComponent implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private auditTrailService: AuditTrailService,
    private ipService: IpService
  ) {}

  ngOnInit() {
    // Check if user data is stored in localStorage
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedRememberMe = localStorage.getItem('rememberMe');

    if (storedRememberMe === 'true' && storedEmail) {
      this.email = storedEmail;
      this.rememberMe = true; // Pre-check the Remember Me checkbox
    }
  }
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

        // Handle "Remember Me" functionality
        if (this.rememberMe) {
          localStorage.setItem('rememberedEmail', this.email);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberMe');
        }


        // Log successful login
        this.auditTrailService.captureAuditLog('Login successful', {
          userId: response.userId,
          userRole: response.role,
          performedBy: response.email,
          details: `User ${response.email} logged in successfully.`,
        });

        // Redirect based on profile completion and role
        if (response.firstName && response.firstName.trim() !== '') {
          if (response.role === 'donor') {
            window.location.href = '/donor-dashboard';
          } else if (response.role === 'recipient') {
            window.location.href = '/recipient-dashboard';
          } else if (response.role === 'admin') {
            window.location.href = '/admin';
          } else {
            console.error('Unknown role:', response.role);
          }
        } else {
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
        this.auditTrailService.captureAuditLog('Login failed', {
          performedBy: this.email,
          details: `Failed login attempt for email: ${this.email}`,
        });
      },
    });
  }
}
