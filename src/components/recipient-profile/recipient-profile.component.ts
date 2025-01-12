import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recipient-profile',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './recipient-profile.component.html',
  styleUrl: './recipient-profile.component.scss'
})
export class RecipientProfileComponent implements OnInit {
  profile = {
    first_name: '',
    last_name: '',
    email: '',
    bloodGroup: '',
    mobileNumber: '',
    address: '',
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadProfile();
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
