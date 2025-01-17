import { Component, OnInit } from '@angular/core';
import { BloodRequestService } from '../../../services/blood-request.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
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
    this.bloodRequestService.getBloodRequestHistory().subscribe({
      next: (data) => {
        this.requests = data;
      },
      error: (err) => {
        console.error('Error fetching blood request history:', err);
      },
    });
  }
}
