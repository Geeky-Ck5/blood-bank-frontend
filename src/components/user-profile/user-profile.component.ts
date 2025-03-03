import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common'; // Import your AuthService

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ FormsModule, NgIf],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  user = {
    first_name: '',
    last_name: '',
    email: '', // Pre-filled after signup
    role: 'donor',
    bloodGroup: '',
    nationalId: '',
    gender: '',

  };

  contactInfo = {
    mobile_number: '',
    mobile_operator: '',
    street_address: '',
    city: '',
    district: '',
    country: '',
  };

  isValidNationalId(): boolean {
    const nationalIdRegex = /^[A-Za-z][0-9]{6}$/;
    return nationalIdRegex.test(this.user.nationalId) && this.user.nationalId.length === 14;
  }

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (!this.isValidNationalId()) {
      alert('Please enter a valid National Identity Card.');
      return;
    }
    const profileData = { ...this.user, ...this.contactInfo };

    // Call the backend to save the data
    this.authService.saveUserProfile(profileData).subscribe({
      next: (response) => {
        console.log('Profile saved successfully:', response);
        // Redirect or show success message
      },
      error: (err) => {
        console.error('Error saving profile:', err);
        // Show error message
      },
    });
  }
}
