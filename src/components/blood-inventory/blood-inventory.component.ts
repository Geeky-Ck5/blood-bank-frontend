import { Component, OnInit } from '@angular/core';
import { BloodInventoryService } from '../../services/blood-inventory.service';

@Component({
  selector: 'app-blood-inventory',
  standalone: true,
  imports: [],
  templateUrl: './blood-inventory.component.html',
  styleUrl: './blood-inventory.component.scss'
})
export class BloodInventoryComponent implements OnInit {
  bloodInventory: any[] = [];

  constructor(private bloodInventoryService: BloodInventoryService) {}

  ngOnInit() {
    this.loadBloodInventory();
  }

  loadBloodInventory() {
    this.bloodInventoryService.getBloodInventory().subscribe({
      next: (data) => {
        this.bloodInventory = data;
      },
      error: (err) => {
        console.error('Error loading blood inventory:', err);
      },
    });
  }

  getStatusClass(units: number): string {
    if (units === 0) {
      return 'low-stock';
    } else if (units < 10) {
      return 'critical-stock';
    } else {
      return 'sufficient-stock';
    }
  }

  getStatusText(units: number): string {
    if (units === 0) {
      return 'Out of Stock';
    } else if (units < 10) {
      return 'Low Stock';
    } else {
      return 'Sufficient Stock';
    }
  }
}
