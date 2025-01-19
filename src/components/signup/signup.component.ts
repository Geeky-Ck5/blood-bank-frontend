import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {RouterLink, Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
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
        alert(response); // Display the plain text message
        window.location.href = '/';
      },
      error: (err) => {
        console.error('Signup failed:', err);
        alert('Signup failed. Please try again later.');
      },
    });
  }
}
