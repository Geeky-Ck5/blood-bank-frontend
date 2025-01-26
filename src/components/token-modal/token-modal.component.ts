import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-token-modal',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './token-modal.component.html',
  styleUrl: './token-modal.component.scss'
})
export class TokenModalComponent implements OnInit {
  @Input() email!: string; // Email address of the user
  @Output() validationSuccess = new EventEmitter<void>();
  @Output() validationFailure = new EventEmitter<string>();

  token = '';
  countdown = 300; // Countdown timer (5 minutes)
  errorMessage = '';
  isTokenExpired = false;
  interval: any;

  private timer: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.startCountdown();
  }

  generateToken() {
    this.authService.generateToken({ email: this.email }).subscribe({
      next: () => {
        this.errorMessage = 'A token has been sent to your email. Please check your inbox.';
      },
      error: (err) => {
        this.errorMessage =
          err.error.message || 'Failed to generate token. Please try again.';
      },
    });
  }


  validateToken() {
    if (this.countdown <= 0) {
      this.errorMessage = 'Token has expired. Please regenerate a new one.';
      return;
    }

    this.authService
      .validateToken({ email: this.email, token: this.token })
      .subscribe({
        next: () => {
          this.validationSuccess.emit(); // Emit success event
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Invalid token.';
          this.validationFailure.emit(this.errorMessage); // Emit failure event with error message
        },
      });
  }

  regenerateToken() {
    this.authService.regenerateToken({ email: this.email }).subscribe({
      next: () => {
        this.errorMessage = 'A new token has been sent to your email.';
        this.countdown = 300; // Reset countdown
        this.isTokenExpired = false; // Reset token expiry status
        this.startCountdown();
      },
      error: (err) => {
        this.errorMessage =
          err.error.message || 'Failed to regenerate token. Please try again.';
      },
    });
  }

  startCountdown() {
    this.interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.interval);
        this.errorMessage = 'Token has expired. Please regenerate a new one.';
        this.validationFailure.emit('Token expired.');
      }
    }, 1000);
  }


  ngOnDestroy(): void {
    clearInterval(this.timer); // Clean up timer on component destroy
  }

}
