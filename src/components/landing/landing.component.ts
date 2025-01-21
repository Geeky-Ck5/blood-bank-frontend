import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        // Store the token if needed
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('role', response.role);
        localStorage.setItem('email', response.email);


        // Redirect based on role
        const role = response.role;
        if (role === 'donor') {
          window.location.href = '/donor-profile';
        } else if (role === 'recipient') {
                   window.location.href = '/recipient-profile';
        } else if (role === 'admin') {
          window.location.href = '/admin';
        } else {
          console.error('Unknown role:', role);
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid credentials. Please try again.');
      },
    });
  }
}
