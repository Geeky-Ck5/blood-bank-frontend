import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donor-dashboard',
  standalone: true,
  templateUrl: './donor-dashboard.component.html',
  styleUrl: './donor-dashboard.component.scss'
})
export class DonorDashboardComponent implements OnInit {
  firstName: string | null = '';
  bloodGroup: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.firstName = localStorage.getItem('firstName') || 'User';
    this.bloodGroup = localStorage.getItem('bloodGroup') || 'Unknown';
  }

  navigateTo(route: string) {
    this.router.navigate([route]);  // ✅ Fix: Ensures correct navigation without errors
  }
}
