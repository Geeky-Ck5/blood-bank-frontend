import { Component } from '@angular/core';
import {RouterLink, } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };
    this.authService.signup(userData).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        // Redirect to email verification or login page
      },
      error: (err) => {
        console.error('Signup failed:', err);
        // Display error message to the user
      },
    });
  }
}
