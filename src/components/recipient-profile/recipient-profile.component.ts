import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {ProfileService} from '../../services/profile.service';
import {CentersService} from '../../services/centers.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-recipient-profile',
  standalone: true,
  imports: [
    FormsModule, NgIf, NgForOf,
  ],
  templateUrl: './recipient-profile.component.html',
  styleUrl: './recipient-profile.component.scss'
})
export class RecipientProfileComponent implements OnInit {
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

  constructor(private authService: AuthService, private profileService: ProfileService, private centersService: CentersService) { }


  ngOnInit() {
    this.loadProfile();
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
  }

  savePreferredCenter(): void {
    if (this.preferredCenterId !== null) {
      this.profileService.savePreferredCenter(this.preferredCenterId).subscribe({
        next: () => {
          alert('Preferred center saved successfully!');
        },
        error: (err) => {
          console.error('Failed to save preferred center:', err);
        },
      });
    }
  }


  loadProfile() {
    this.authService.getRecipientProfile().subscribe({
      next: (data) => {
        this.profile = data;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
      },
    });
  }

  onSubmit() {
    this.authService.updateRecipientProfile(this.profile).subscribe({
      next: (response) => {
        console.log('Profile updated successfully:', response);
        alert('Your profile has been updated!');
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile. Please try again.');
      },
    });
  }
}
