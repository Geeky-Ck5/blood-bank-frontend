import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipient-dashboard',
  templateUrl: './recipient-dashboard.component.html',
  styleUrl: './recipient-dashboard.component.scss'
})
export class RecipientDashboardComponent implements OnInit {
  userName: string | null = '';
  bloodGroup: string | null = '';
  totalRequests: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('firstName') || 'User';
    this.bloodGroup = localStorage.getItem('bloodGroup') || 'Unknown';
    this.totalRequests = parseInt(localStorage.getItem('totalRequests') || '0', 10);
  }

  goToProfile() {
    this.router.navigate(['/recipient-profile']);
  }

  changePassword() {
    this.router.navigate(['/change-password']);
  }

  scheduleAppointment() {
    this.router.navigate(['/schedule-appointment']);
  }

  trackRequestStatus() {
    this.router.navigate(['/track-request-status']);
  }

  submitBloodRequest() {
    this.router.navigate(['/submit-blood-request']);
  }

  viewHistory() {
    this.router.navigate(['/request-history']);
  }

  readCommunityStories() {
    this.router.navigate(['/community-stories']);
  }

  viewNotifications() {
    this.router.navigate(['/notifications']);
  }
}
