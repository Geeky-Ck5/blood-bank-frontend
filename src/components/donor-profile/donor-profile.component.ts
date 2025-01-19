import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CentersService } from '../../services/centers.service';
import { ProfileService } from '../../services/profile.service';
import { NgForOf, NgIf } from '@angular/common'; // Import NgForOf for *ngFor

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
    first_name: '',
    last_name: '',
    bloodGroup: '',
    autoReminders: false,
    nationalId: '',
    gender: '',

  };
  centers: any[] = [];
  preferredCenterId: number | null = null;

  constructor(private authService: AuthService,private profileService: ProfileService,private centersService: CentersService) {}

  ngOnInit() {

    // Fetch centers when the component loads
    this.centersService.getCenters().subscribe({
      next: (data) => {
        this.centers = data; // Direct assignment because the API returns an array
        console.log('Centers fetched:', this.centers); // Debug log
      },
      error: (err) => {
        console.error('Error fetching centers:', err);
      },
    });

    // Fetch the user's preferred center
    this.profileService.getPreferredCenter().subscribe({
      next: (data) => {
        this.preferredCenterId = data.centerId; // Assign the preferred center ID
      },
      error: (err) => {
        console.error('Failed to fetch preferred center:', err);
      },
    });

    // Fetch the donor's profile details
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.profile = data; // Populate profile data
        if (this.profile.autoReminders === undefined) {
          // Ensure autoReminders has a default value if undefined
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
    const nationalIdRegex = /^[A-Za-z][0-9]{13}$/; // 1 letter followed by 13 digits
    return nationalIdRegex.test(this.profile.nationalId);
  }

  onSubmit() {

    if (!this.isValidNationalId()) {
      alert('Please enter a valid National Identity Card.');
      return;
    }
    // Submit updated profile details
    this.authService.updateProfile(this.profile).subscribe({
      next: (response) => {
        console.log('Profile updated successfully:', response);
        alert('Profile updated!');
      },
      error: (err) => {
        console.error('Error updating profile:', err);
      },
    });
  }

}
