import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {RouterLink, Router} from '@angular/router';
import {TokenModalComponent} from '../token-modal/token-modal.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    TokenModalComponent,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = '';


  showModal = false; // Determines if the modal is visible
  errorMessage = ''; // Stores error messages to show in the modal

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!this.role) {
      alert('Please select a role (Donor or Recipient).');
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    };


    this.authService.signup(userData).subscribe({
      next: (response: string) => {
        console.log('Signup successful:', response);
        alert(response); // Inform the user of the signup success

        // Trigger token generation after signup
        this.authService.generateToken({ email: this.email }).subscribe({
          next: () => {
            console.log('Token generated and sent to email.');
            this.showModal = true; // Show the token modal
          },
          error: (err) => {
            console.error('Failed to generate token:', err);
            this.errorMessage =
              err.error.message || 'Token generation failed. Please try again.';
          }
        });
      },
      error: (err) => {
        console.error('Signup failed:', err);
        alert('Signup failed. Please try again later.');
      }
    });
  }

  /**
   * Triggered when the token validation succeeds.
   */
  onTokenValidationSuccess(): void {
    this.showModal = false;

    // Redirect based on role after successful token validation
    if (this.role === 'donor') {
      window.location.href = '/donor-profile';
    } else if (this.role === 'recipient') {
      window.location.href = '/recipient-profile';
    }
  }

  /**
   * Triggered when the token validation fails.
   */
  onTokenValidationFailure(error: string): void {
    this.errorMessage = error; // Display the error message in the modal
  }
}
