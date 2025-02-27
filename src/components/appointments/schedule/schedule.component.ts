import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CentersService } from '../../../services/centers.service';
import { AuthService } from '../../../services/auth.service';
import { EventsService } from '../../../services/events.service';

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
  appointment: any = {};
  centers: any[] = [];
  donationCenters: any[] = [];
  preferredCenterId: number | null = null;
  saveAsPreferred: boolean = false;

  // ✅ Added upcoming appointments and events
  upcomingAppointments: any[] = [];
  upcomingEvents: any[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private centersService: CentersService,
    private authService: AuthService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.loadCenters();
    this.loadPreferredCenter();
    this.loadUpcomingAppointments();  // ✅ Load upcoming appointments
    this.loadUpcomingEvents();  // ✅ Load upcoming events
  }

  /**
   * ✅ Fetch donation centers
   */
  loadCenters() {
    this.centersService.getCenters().subscribe({
      next: (data) => {
        this.centers = data;
        this.donationCenters = data;
      },
      error: (err) => {
        console.error('Error loading centers:', err);
      },
    });
  }

  /**
   * ✅ Load user's preferred donation center
   */
  loadPreferredCenter() {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.preferredCenterId = data.preferredCenter;
        if (this.preferredCenterId) {
          this.appointment.donationCenter = this.preferredCenterId;
        }
      },
      error: (err) => {
        console.error('Error loading preferred center:', err);
      },
    });
  }

  /**
   * ✅ Fetch upcoming appointments
   */
  loadUpcomingAppointments() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.appointmentService.getUpcomingAppointments(parseInt(userId)).subscribe({
      next: (data) => {
        this.upcomingAppointments = data;
      },
      error: (err) => {
        console.error('Error fetching upcoming appointments:', err);
      },
    });
  }

  /**
   * ✅ Fetch upcoming donation events
   */
  loadUpcomingEvents() {
    this.eventsService.getUpcomingEvents().subscribe({
      next: (data) => {
        this.upcomingEvents = data;
      },
      error: (err) => {
        console.error('Error fetching upcoming events:', err);
      },
    });
  }

  /**
   * ✅ Submit appointment request
   */
  onSubmit() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not found. Please log in again.');
      return;
    }

    const selectedCenter = this.donationCenters.find(center => center.id === this.appointment.donationCenter);
    if (!selectedCenter) {
      alert('Invalid donation center selected.');
      return;
    }

    const appointmentPayload = {
      userId: parseInt(userId, 10),
      centerName: selectedCenter.name,
      date: this.appointment.date,
      time: this.appointment.time + ":00",
      status: "scheduled"
    };

    this.appointmentService.scheduleAppointment(appointmentPayload).subscribe({
      next: (response) => {
        console.log('Appointment scheduled successfully:', response);
        alert('Your appointment has been scheduled successfully!');
        this.loadUpcomingAppointments();  // ✅ Refresh upcoming appointments
      },
      error: (err) => {
        console.error('Error scheduling appointment:', err);
        alert('Failed to schedule appointment. Please try again.');
      },
    });
  }
}
