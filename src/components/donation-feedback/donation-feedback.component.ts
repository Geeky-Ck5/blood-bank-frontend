import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf} from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-donation-feedback',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    DatePipe
  ],
  templateUrl: './donation-feedback.component.html',
  styleUrl: './donation-feedback.component.scss'
})
export class DonationFeedbackComponent implements OnInit {
  appointments: any[] = [];
  feedback = {
    appointmentId: '',
    rating: '',
    comments: '',
  };

  constructor(
    private appointmentService: AppointmentService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getCompletedAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => {
        console.error('Error loading appointments:', err);
      },
    });
  }

  submitFeedback() {
    this.feedbackService.submitFeedback(this.feedback).subscribe({
      next: () => {
        alert('Thank you for your feedback!');
        this.feedback = { appointmentId: '', rating: '', comments: '' };
      },
      error: (err) => {
        console.error('Error submitting feedback:', err);
        alert('Failed to submit feedback. Please try again.');
      },
    });
  }
}
