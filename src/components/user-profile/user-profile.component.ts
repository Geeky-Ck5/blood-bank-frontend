import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms'; // Import your AuthService

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  user = {
    first_name: '',
    last_name: '',
    email: '', // Pre-filled after signup
    role: 'donor',
    bloodGroup: '',// Default value
  };

  contactInfo = {
    mobile_number: '',
    mobile_operator: '',
    street_address: '',
    city: '',
    district: '',
    country: '',
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
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
