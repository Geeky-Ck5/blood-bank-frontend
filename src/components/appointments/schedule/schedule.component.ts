import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CentersService } from '../../../services/centers.service';
import { AuthService } from '../../../services/auth.service';
import { EventsService } from '../../../services/events.service'; // Import Event Service

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    FormsModule, RouterLink, CommonModule
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent implements OnInit {
  appointment: any = { centerId: '', date: '', time: '' };
  centers: any[] = [];
  preferredCenterId: number | null = null;
  saveAsPreferred: boolean = false;
  upcomingAppointments: any[] = [];
  lastAppointment: any = null;
  donationEvents: any[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private centersService: CentersService,
    private authService: AuthService,
    private eventsService: EventsService // Inject Event Service
  ) {}

  ngOnInit() {
    this.loadCenters();
    this.loadPreferredCenter();
    this.loadUpcomingAppointments();
    this.loadLastAppointment();
    this.loadDonationEvents();
  }

  /**
   * Fetch available donation centers.
   */
  loadCenters() {
    this.centersService.getCenters().subscribe({
      next: (data) => {
        this.centers = data;
      },
      error: (err) => {
        console.error('Error loading centers:', err);
      }
    });
  }

  /**
   * Fetch preferred center from user profile.
   */
  loadPreferredCenter() {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.preferredCenterId = data.preferredCenter;
        if (this.preferredCenterId) {
          this.appointment.centerId = this.preferredCenterId;
        }
      },
      error: (err) => {
        console.error('Error loading preferred center:', err);
      }
    });
  }

  /**
   * Fetch upcoming appointments.
   */
  loadUpcomingAppointments() {
    this.appointmentService.getAppointments().subscribe({
      next: (appointments) => {
        this.upcomingAppointments = appointments.filter(appt => appt.status === 'Upcoming');
      },
      error: (err) => console.error('Error loading upcoming appointments:', err)
    });
  }

  /**
   * Fetch the last completed appointment.
   */
  loadLastAppointment() {
    this.appointmentService.getAppointments().subscribe({
      next: (appointments) => {
        const pastAppointments = appointments.filter(appt => appt.status === 'Completed');
        this.lastAppointment = pastAppointments.length > 0 ? pastAppointments[pastAppointments.length - 1] : null;
      },
      error: (err) => console.error('Error loading last appointment:', err)
    });
  }

  /**
   * Fetch upcoming donation events.
   */
  loadDonationEvents() {
    this.eventsService.getUpcomingEvents().subscribe({
      next: (events) => {
        this.donationEvents = events;
      },
      error: (err) => console.error('Error loading donation events:', err)
    });
  }

  /**
   * Save preferred donation center if user selects to do so.
   */
  savePreferredCenter(centerId: number) {
    this.authService.updateProfile({ preferredCenter: centerId }).subscribe({
      next: () => console.log('Preferred center updated successfully!'),
      error: (err) => console.error('Error saving preferred center:', err)
    });
  }

  /**
   * Handle appointment scheduling.
   */
  onSubmit() {
    this.appointmentService.scheduleAppointment(this.appointment).subscribe({
      next: (response) => {
        alert('Your appointment has been scheduled!');

        // Update preferred center if checkbox is checked
        if (this.saveAsPreferred && this.appointment.centerId) {
          this.savePreferredCenter(this.appointment.centerId);
        }

        // Refresh upcoming appointments list
        this.loadUpcomingAppointments();
        this.loadLastAppointment();
      },
      error: (err) => {
        console.error('Error scheduling appointment:', err);
        alert('Failed to schedule appointment. Please try again.');
      }
    });
  }
}
