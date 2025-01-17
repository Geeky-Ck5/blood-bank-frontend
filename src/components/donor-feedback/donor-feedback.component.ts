import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-donor-feedback',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './donor-feedback.component.html',
  styleUrl: './donor-feedback.component.scss'
})
export class DonorFeedbackComponent implements OnInit {
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

  onSubmit() {
    this.feedbackService.submitFeedback(this.feedback).subscribe({
      next: (response) => {
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
