import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/userservice.service';

@Component({
  selector: 'app-recipient-dashboard',
  templateUrl: './recipient-dashboard.component.html',
  styleUrl: './recipient-dashboard.component.scss'
})
export class RecipientDashboardComponent implements OnInit {
  firstName: string | null = '';
  bloodGroup: string | null = '';
  totalRequests: number = 0;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.firstName = localStorage.getItem('firstName') || 'User';
    this.bloodGroup = localStorage.getItem('bloodGroup') || 'Unknown';
    this.totalRequests = parseInt(localStorage.getItem('totalRequests') || '0', 10);
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
  goToProfile() {
    this.router.navigate(['/recipient-profile']);
  }

  changePassword() {
    this.router.navigate(['/change-password']);
  }

  scheduleAppointment() {
    this.router.navigate(['/appointments/schedule']);
  }

  trackRequestStatus() {
    this.router.navigate(['/track-request-status']);
  }

  submitBloodRequest() {
    this.router.navigate(['recipient/blood-request/new']);
  }

  viewHistory() {
    this.router.navigate(['recipient/blood-request/history']);
  }

  readCommunityStories() {
    this.router.navigate(['/donor/community/stories']);
  }

  viewNotifications() {
    this.router.navigate(['/recipient/notifications']);
  }
}
