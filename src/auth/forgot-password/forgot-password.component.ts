import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ FormsModule, NgIf],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  email: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.sendResetPasswordToken({ email: this.email }).subscribe({
      next: (response) => {
        console.log('Password reset token sent:', response);
        // Display success message
        this.successMessage = 'A reset password token has been sent to your email.';
        this.errorMessage = ''; // Clear any previous error messages

        // Redirect to the reset-password page
        window.location.href = '/reset-password';
      },
      error: (err) => {
        console.error('Failed to send password reset token:', err);
        this.successMessage = ''; // Clear any success messages
        // Display error message from the server or fallback to default
        this.errorMessage = err.error?.message || 'Failed to send password reset email.';
      },
    });
  }
}
