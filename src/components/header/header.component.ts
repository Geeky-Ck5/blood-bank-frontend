import { Component,OnInit  } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  firstName: string | null = '';
  role: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkLoginState();
  }

  /**
   * Check if the user is logged in by reading from localStorage.
   */
  checkLoginState() {
    this.firstName = localStorage.getItem('firstName');
    this.role = localStorage.getItem('role');
    this.isLoggedIn = !!this.firstName; // Convert string to boolean
  }

  /**
   * Log out the user by clearing session storage and redirecting to home.
   */
  logout() {
    localStorage.clear(); // Remove all stored session data
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  /**
   * Navigate to the correct dashboard based on the user's role.
   */
  goToDashboard() {
    if (this.role === 'donor') {
      window.location.href = '/donor-dashboard';
    } else if (this.role === 'recipient') {
      window.location.href = '/recipient-dashboard';
    } else if (this.role === 'admin') {
      window.location.href = '/admin';
    }
  }
}
