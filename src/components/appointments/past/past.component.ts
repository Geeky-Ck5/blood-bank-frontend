import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-past',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './past.component.html',
  styleUrl: './past.component.scss'
})
export class PastComponent implements OnInit {
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.fetchPastAppointments();
  }

  fetchPastAppointments() {
    this.appointmentService.getPastAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => {
        console.error('Error fetching past appointments:', err);
      },
    });
  }

  updateAppointmentStatus(appointmentId: number, newStatus: string) {
    this.appointmentService.updateAppointmentStatus(appointmentId, newStatus).subscribe({
      next: (updatedAppointment) => {
        // Update the appointment in the local array
        const index = this.appointments.findIndex(app => app.id === appointmentId);
        if (index !== -1) {
          this.appointments[index] = updatedAppointment;
        }
      },
      error: (err) => {
        console.error('Error updating appointment status:', err);
      }
    });
  }

}
