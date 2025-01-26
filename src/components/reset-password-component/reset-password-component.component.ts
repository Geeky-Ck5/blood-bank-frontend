import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';



@Component({
  selector: 'app-reset-password-component',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './reset-password-component.component.html',
  styleUrl: './reset-password-component.component.scss'
})
export class ResetPasswordComponentComponent {
  email: string = '';
  token!: number;
  newPassword: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    const resetData = {
      email: this.email,
      token: this.token,
      newPassword: this.newPassword,
    };

    this.authService.resetPassword(resetData).subscribe({
      next: (response: string) => {
        this.successMessage = response; // Display plain text success message
        this.errorMessage = ''; // Clear any previous error
        window.location.href = '';
      },
      error: (err) => {
        console.error('Failed to reset password:', err);
        this.errorMessage = err.error?.message || 'Failed to reset password.';
        this.successMessage = ''; // Clear any success message
      },
    });
  }
}
