import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CentersService } from '../../services/centers.service';
import { ProfileService } from '../../services/profile.service';
import { ContactInfoService } from '../../services/contact-info-service.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-donor-profile',
  standalone: true,
  imports: [
    FormsModule, NgIf, NgForOf,
  ],
  templateUrl: './donor-profile.component.html',
  styleUrl: './donor-profile.component.scss'
})
export class DonorProfileComponent implements OnInit {
  profile = {
    firstname: '',
    lastname: '',
    blood_Group: '',
    autoReminders: false,
    national_Id: '',
    gender: '',
    email: null as string | null,
    userId: null as number | null,
  };

  centers: any[] = [];
  preferredCenterId: number | null = null;
  userId: number | null = null;

  contactInfo = {
    mobile_number: '',
    mobile_operator: '',
    street_address: '',
    address_line_1: '',
    address_line_2: '',
    address_line_3: '',
    city: '',
    district: '',
    country: '',
  };

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private centersService: CentersService,
    private contactInfoService: ContactInfoService
  ) {}

  ngOnInit() {
    // Retrieve userId from localStorage
    const userIdString = localStorage.getItem('userId');
    this.userId = userIdString ? Number(userIdString) : null;

    const emailFromStorage = localStorage.getItem('email');
    this.profile.email = emailFromStorage || null;


    if (!this.userId) {
      console.error('User ID not found in local storage.');
      alert('Please log in again.');
      return;
    }

    // Assign userId to profile
    this.profile.userId = this.userId;


    // Fetch centers
    this.centersService.getCenters().subscribe({
      next: (data) => {
        this.centers = data;
        console.log('Centers fetched:', this.centers);
      },
      error: (err) => {
        console.error('Error fetching centers:', err);
      },
    });

    // Fetch preferred center
    this.profileService.getPreferredCenter().subscribe({
      next: (data) => {
        this.preferredCenterId = data.centerId;
      },
      error: (err) => {
        console.error('Failed to fetch preferred center:', err);
      },
    });

    // Fetch profile details
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        if (this.profile.autoReminders === undefined) {
          this.profile.autoReminders = false;
        }
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      },
    });

    this.loadCenters();
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

  isValidNationalId(): boolean {
    const nationalIdRegex = /^[A-Za-z][0-9]{13}$/;
    return nationalIdRegex.test(this.profile.national_Id);
  }

  isValidMobileNumber(): boolean {
    const mobileNumberRegex = /^[0-9]{8}$/;
    return mobileNumberRegex.test(this.contactInfo.mobile_number);
  }

  onSubmit() {
    if (!this.isValidNationalId()) {
      alert('Please enter a valid National Identity Card.');
      return;
    }

    if (!this.isValidMobileNumber()) {
      alert('Please enter a valid Mobile Number (8 digits).');
      return;
    }

    const payload = {
      profile: this.profile,
      contactInfo: this.contactInfo,
    };


    console.log('Request Payload:', this.profile, this.contactInfo);

    this.authService.updateProfile(this.profile).subscribe({
      next: (response) => {
        console.log('Profile updated successfully:', response);
        if (response.message) {
          alert(response.message); // Show the message from the backend
        }

        this.contactInfoService.updateContactInfo(this.userId!, this.contactInfo).subscribe({
          next: (response) => {
            console.log('Contact info updated successfully:', response);
            alert('Profile and contact information updated successfully!');
            window.location.href = '/donor-dashboard';
          },
          error: (err) => {
            console.error('Error updating contact information:', err);
            alert('Failed to update contact information.');
          },
        });
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile.');
      },
    });
  }
  }
