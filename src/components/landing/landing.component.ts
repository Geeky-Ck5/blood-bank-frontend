import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.authService.saveToken(response.token); // Save token to localStorage
        // Redirect to the dashboard or another page
      },
      error: (err) => {
        console.error('Login failed:', err);
        // Display error message to the user
      },
    });
  }
}
