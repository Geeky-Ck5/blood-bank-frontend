import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CentersService } from '../../../services/centers.service';
import { AuthService } from '../../../services/auth.service';
import { EventsService } from '../../../services/events.service';
import { GoogleMapsModule } from '@angular/google-maps';


@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    FormsModule, RouterLink, CommonModule, GoogleMapsModule
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent implements OnInit {
  appointment: any = {};
  centers: any[] = [];
  selectedCenter: any = null;
  donationCenters: any[] = [];
  preferredCenterId: number | null = null;
  saveAsPreferred: boolean = false;

  // ✅ Added upcoming appointments and events
  upcomingAppointments: any[] = [];
  upcomingEvents: any[] = [];
  // Default Map Settings (Centered in Mauritius)
  mapCenter = { lat: -20.297617, lng: 57.498196 };
  mapZoom = 12;

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

  loadCenters() {
    this.centersService.getCenters().subscribe({
      next: (data) => {
        this.donationCenters = data.map((center) => ({
          name: center.name,
          location: { lat: center.latitude, lng: center.longitude },
        }));
      },
      error: (err) => console.error('Error loading centers:', err),
    });
  }

  updateSelectedCenter() {
    if (this.selectedCenter) {
      this.mapCenter = this.selectedCenter.location; // Move map to selected center
    }
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
