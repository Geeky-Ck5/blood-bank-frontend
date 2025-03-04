import { Component, OnInit } from '@angular/core';
import { BloodRequestService } from '../../../services/blood-request.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  requests: any[] = [];

  constructor(private bloodRequestService: BloodRequestService) {}

  ngOnInit() {
    this.loadBloodRequests();
  }

  loadBloodRequests() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    this.bloodRequestService.getBloodRequestHistory(parseInt(userId)).subscribe({
      next: (data) => {
        this.requests = data;
      },
      error: (err) => {
        console.error('Error fetching blood request history:', err);
      },
    });
  }
}
