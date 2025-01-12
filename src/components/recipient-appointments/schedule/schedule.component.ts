import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent  implements OnInit {
  appointment = {
    donationCenter: '',
    date: '',
    time: '',
    notes: '',
  };

  donationCenters: string[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadDonationCenters();
  }

  loadDonationCenters() {
    // Fetch donation centers (replace this with API call)
    this.donationCenters = ['Center A', 'Center B', 'Center C'];
  }

  onSubmit() {
    this.appointmentService.scheduleRecipientAppointment(this.appointment).subscribe({
      next: (response) => {
        console.log('Appointment scheduled successfully:', response);
        alert('Your appointment has been scheduled!');
      },
      error: (err) => {
        console.error('Error scheduling appointment:', err);
        alert('Failed to schedule appointment. Please try again.');
      },
    });
  }
}
