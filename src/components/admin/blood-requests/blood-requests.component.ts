import { Component, OnInit } from '@angular/core';
import { BloodRequestService } from '../../../services/blood-request.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-blood-requests',
  standalone: true,
  templateUrl: './blood-requests.component.html',
  imports: [
    NgIf,
    NgClass,
    NgForOf
  ],
  styleUrl: './blood-requests.component.scss'
})
export class BloodRequestsComponent implements OnInit {
  bloodRequests: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private bloodRequestService: BloodRequestService) {}

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.bloodRequestService.getBloodRequestHistory().subscribe({
      next: (requests) => {
        this.bloodRequests = requests;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load blood requests.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  approveRequest(requestId: number) {
    this.bloodRequestService.updateBloodRequestStatus(requestId, 'APPROVED').subscribe({
      next: () => {
        alert('Request Approved');
        this.loadRequests();
      },
      error: (err) => {
        console.error('Error approving request:', err);
        alert('Error approving request');
      }
    });
  }

  rejectRequest(requestId: number) {
    this.bloodRequestService.updateBloodRequestStatus(requestId, 'REJECTED').subscribe({
      next: () => {
        alert('Request Rejected');
        this.loadRequests();
      },
      error: (err) => {
        console.error('Error rejecting request:', err);
        alert('Error rejecting request');
      }
    });
  }
}
