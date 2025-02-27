import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/userservice.service';

@Component({
  selector: 'app-donor-dashboard',
  standalone: true,
  templateUrl: './donor-dashboard.component.html',
  styleUrl: './donor-dashboard.component.scss'
})
export class DonorDashboardComponent implements OnInit {
  firstName: string | null = '';
  bloodGroup: string | null = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.firstName = localStorage.getItem('firstName') || 'User';
    this.bloodGroup = localStorage.getItem('bloodGroup') || 'Unknown';
    const userId = localStorage.getItem('userId'); // Get user ID from local storage
    if (userId) {
      this.fetchUserDetails(+userId);
    }
  }

  fetchUserDetails(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.firstName = user.firstName;
        this.bloodGroup = user.bloodGroup || 'Unknown';
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      },
    });
  }
  navigateTo(route: string) {
    this.router.navigate([route]);  // ✅ Fix: Ensures correct navigation without errors
  }
}
