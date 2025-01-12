import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import {RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.scss'
})
export class UpcomingComponent implements OnInit {
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.fetchUpcomingAppointments();
  }

  fetchUpcomingAppointments() {
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
    this.appointmentService.cancelAppointment(appointmentId).subscribe({
      next: () => {
        alert('Appointment canceled successfully!');
        this.fetchUpcomingAppointments();
      },
      error: (err) => {
        console.error('Error canceling appointment:', err);
      },
    });
  }
}
