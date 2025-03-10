import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { faUser, faHeart, faSyringe, faTasks, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {NgForOf, NgStyle} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  statsArray: Array<any> = [];
  bloodInventory: Array<any> = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
    this.loadBloodInventorySummary();
  }

  loadDashboardStats(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (stats) => {
        this.statsArray = [
          {
            title: 'Pending Requests',
            value: stats.totalPendingRequests,
            icon: faTasks,
            color: '#FF6F61',
          },
          {
            title: 'Total Donors',
            value: stats.totalDonors,
            icon: faUser,
            color: '#4CAF50',
          },
          {
            title: 'Total Recipients',
            value: stats.totalRecipients,
            icon: faHeart,
            color: '#845EC2',
          },
          {
            title: 'Blood Units Available',
            value: stats.totalBloodUnitsAvailable,
            icon: faSyringe,
            color: '#2196F3',
          },
          {
            title: 'Approved Requests',
            value: stats.totalApprovedRequests,
            icon: faCheckCircle,
            color: '#F9A825',
          },
          {
            title: 'Total Donation Requests',
            value: stats.totalDonationRequests,
            icon: faTasks,
            color: '#FF9800',
          },
        ];
      },
      error: (err) => {
        console.error('Error loading dashboard stats:', err);
      },
    });
  }

  loadBloodInventorySummary(): void {
    this.dashboardService.getBloodInventorySummary().subscribe({
      next: (data) => {
        this.bloodInventory = data; // Data for the blood inventory summary
        console.log('Blood Inventory:', this.bloodInventory);
      },
      error: (err) => {
        console.error('Error loading blood inventory summary:', err);
      },
    });
  }
}
