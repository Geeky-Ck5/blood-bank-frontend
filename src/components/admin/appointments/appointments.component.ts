import { Component, OnInit } from '@angular/core';
import { AppointmentService, Appointment } from '../../../services/appointment.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  loading: boolean = true;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading appointments:', err);
        this.loading = false;
      }
    });
  }

  updateStatus(appointment: Appointment, newStatus: string): void {
    this.appointmentService.updateAppointmentStatus(appointment.appointmentId, newStatus).subscribe({
      next: () => {
        appointment.status = newStatus;
        alert('Appointment status updated successfully!');
      },
      error: (err) => {
        console.error('Error updating status:', err);
        alert('Failed to update appointment status.');
      }
    });
  }

}
