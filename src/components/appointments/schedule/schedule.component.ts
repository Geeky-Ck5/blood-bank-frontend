import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import {RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { CentersService } from '../../../services/centers.service';
import { AuthService } from '../../../services/auth.service';

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
/*  appointment = {
    donationCenter: '',
    date: '',
    time: ''
  };*/
  appointment: any = {};
  centers: any[] = [];
  preferredCenterId: number | null = null;
  saveAsPreferred: boolean = false;
  donationCenters: string[] = [];

  constructor(private appointmentService: AppointmentService, private centersService: CentersService, private authService: AuthService) {}

  ngOnInit() {
    // Fetch donation centers (example data; fetch from backend)
    this.donationCenters = ['Center A', 'Center B', 'Center C'];
    this.loadCenters();
    this.loadPreferredCenter();


  }

  loadCenters() {
    this.centersService.getCenters().subscribe({
      next: (data) => {
        this.centers = data;
      },
      error: (err) => {
        console.error('Error loading centers:', err);
      },
    });
  }

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
      },
    })
  }

    savePreferredCenter(centerId: number) {
      this.authService.updateProfile({ preferredCenter: centerId }).subscribe({
        next: () => {
          alert('Appointment scheduled and preferred center updated!');
        },
        error: (err) => {
          console.error('Error saving preferred center:', err);
        },
      });
    }


  onSubmit() {
    this.appointmentService.scheduleAppointment(this.appointment).subscribe({
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
