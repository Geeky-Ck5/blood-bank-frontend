import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { FeedbackService } from '../../services/feedback.service';
import { CentersService } from '../../services/centers.service';

@Component({
  selector: 'app-admin-feedback',
  imports: [
    FormsModule,
    NgForOf,
    DatePipe,
    NgIf
  ],
  templateUrl: './admin-feedback.component.html',
  styleUrl: './admin-feedback.component.scss'
})
export class AdminFeedbackComponent implements OnInit {
  feedbackList: any[] = [];
  filteredFeedback: any[] = [];
  centers: any[] = [];
  filters = { center: '' };

  constructor(
    private feedbackService: FeedbackService,
    private centersService: CentersService
  ) {}

  ngOnInit() {
    this.loadFeedback();
    this.loadCenters();
  }

  loadFeedback() {
    this.feedbackService.getAllFeedback().subscribe({
      next: (data) => {
        this.feedbackList = data;
        this.filteredFeedback = data;
      },
      error: (err) => {
        console.error('Error loading feedback:', err);
      },
    });
  }

  loadCenters() {
    this.centersService.getCenters().subscribe({
      next: (data) => {
        this.centers = data;
      },
      error: (err) => {
        console.error('Error loading centers:', err);
      },
    });
  }

  applyFilters() {
    this.filteredFeedback = this.feedbackList.filter((feedback) =>
      this.filters.center ? feedback.centerId === this.filters.center : true
    );
  }

  submitResponse(feedback: any) {
    this.feedbackService.addAdminResponse(feedback.id, feedback.newResponse).subscribe({
      next: () => {
        feedback.response = feedback.newResponse;
        feedback.newResponse = '';
        alert('Response submitted successfully!');
      },
      error: (err) => {
        console.error('Error submitting response:', err);
        alert('Failed to submit response. Please try again.');
      },
    });
  }
}
