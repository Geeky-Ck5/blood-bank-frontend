import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { CentersService } from '../../../services/centers.service';
import { AuthService } from '../../../services/auth.service';
import { EventsService } from '../../../services/events.service';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    FormsModule,  CommonModule, GoogleMapsModule
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
  upcomingAppointments: any[] = [];
  upcomingEvents: any[] = [];

  // Google Maps
  mapCenter = { lat: -20.297617, lng: 57.498196 }; // Default center
  mapZoom = 12;
  markers: any[] = [];
  selectedMarker: any = null;
  selectedCenter: any = null;

  constructor(
    private appointmentService: AppointmentService,
    private centersService: CentersService,
    private authService: AuthService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.loadCenters();
    this.loadPreferredCenter();
    this.loadUpcomingAppointments();
    this.loadUpcomingEvents();
  }

  /**
   * ✅ Load donation centers and populate map markers
   */
  loadCenters() {
    this.centersService.getCenters().subscribe({
      next: (centers) => {
        this.donationCenters = centers;
        this.markers = centers
          .filter(center => center.latitude && center.longitude)
          .map(center => ({
            position: {
              lat: Number(center.latitude),
              lng: Number(center.longitude),
            },
            title: center.name,
            centerData: center,
            icon: {
              url: center.type === 'hospital'
                ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: { width: 40, height: 40 }
            }
          }));
      },
      error: (err) => console.error('Error loading centers:', err),
    });
  }

  /**
   * ✅ When user selects a center from dropdown, update map
   */
  onCenterSelectionChange() {
    if (this.selectedCenter && this.selectedCenter.latitude && this.selectedCenter.longitude) {
      this.mapCenter = {
        lat: Number(this.selectedCenter.latitude),  // Convert to number
        lng: Number(this.selectedCenter.longitude) // Convert to number
      };
    } else {
      console.warn('Invalid center location, using default map center.');
      this.mapCenter = { lat: -20.297617, lng: 57.498196 };  // Default fallback location
    }
  }

  /**
   * ✅ When user clicks on a marker, update dropdown selection
   */
  onMarkerClick(marker: any) {
    if (marker.centerData && marker.centerData.latitude && marker.centerData.longitude) {
      this.selectedCenter = marker.centerData; // Update dropdown
      this.onCenterSelectionChange(); // Sync map center
    } else {
      console.warn('Invalid marker location clicked.');
    }
  }

  /**
   * ✅ Load preferred center for user
   */
  loadPreferredCenter() {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.preferredCenterId = data.preferredCenter;
        if (this.preferredCenterId) {
          this.selectedCenter = this.donationCenters.find(center => center.id === this.preferredCenterId);
          this.onCenterSelectionChange();
        }
      },
      error: (err) => console.error('Error loading preferred center:', err),
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
      error: (err) => console.error('Error fetching upcoming events:', err),
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
      error: (err) => console.error('Error fetching upcoming appointments:', err),
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

    if (!this.selectedCenter) {
      alert('Please select a donation center.');
      return;
    }

    const appointmentPayload = {
      userId: parseInt(userId, 10),
      centerName: this.selectedCenter.name,
      date: this.appointment.date,
      time: this.appointment.time + ":00",
      status: "scheduled"
    };

    this.appointmentService.scheduleAppointment(appointmentPayload).subscribe({
      next: () => {
        alert('Your appointment has been scheduled successfully!');
        this.loadUpcomingAppointments();
      },
      error: (err) => console.error('Error scheduling appointment:', err),
    });
  }
}
