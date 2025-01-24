import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';
import { faUser, faHeart, faSyringe, faTasks, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {DatePipe, NgForOf, NgStyle} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-blood-inventory',
  imports: [
    DatePipe,
    NgForOf
  ],
  templateUrl: './blood-inventory.component.html',
  styleUrl: './blood-inventory.component.scss'
})
export class BloodInventoryComponent implements OnInit {
  bloodInventory: Array<any> = [];
  expiryAlerts: Array<any> = [];
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {

    this.loadBloodInventorySummary();
    this.loadExpiryAlerts();
  }

  loadBloodInventorySummary(): void {
    this.dashboardService.getBloodInventorySummary().subscribe({
      next: (data) => (this.bloodInventory = data),
      error: (err) => console.error('Error loading blood inventory summary:', err),
    });
  }

  loadExpiryAlerts(): void {
    this.dashboardService.getExpiryAlerts().subscribe({
      next: (data) => {
        this.expiryAlerts = data;
        console.log('Expiry Alerts:', this.expiryAlerts);
      },
      error: (err) => console.error('Error loading expiry alerts:', err),
    });
  }
}
