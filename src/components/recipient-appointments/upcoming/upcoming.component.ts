import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.scss'
})
export class UpcomingComponent implements OnInit {
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadUpcomingAppointments();
  }

  loadUpcomingAppointments() {
    this.appointmentService.getUpcomingAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => {
        console.error('Error fetching upcoming appointments:', err);
      },
    });
  }

  cancelAppointment(appointmentId: number) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.appointmentService.cancelAppointment(appointmentId).subscribe({
        next: () => {
          this.appointments = this.appointments.filter(
            (a) => a.id !== appointmentId
          );
          alert('Appointment canceled successfully.');
        },
        error: (err) => {
          console.error('Error canceling appointment:', err);
          alert('Failed to cancel appointment. Please try again.');
        },
      });
    }
  }
}
