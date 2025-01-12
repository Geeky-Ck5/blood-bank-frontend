import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
@Component({
  selector: 'app-past',
  standalone: true,
  imports: [],
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

}
