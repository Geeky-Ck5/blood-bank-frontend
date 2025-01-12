import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-donor-profile',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './donor-profile.component.html',
  styleUrl: './donor-profile.component.scss'
})
export class DonorProfileComponent implements OnInit {
  profile = {
    first_name: '',
    last_name: '',
    email: '',
    bloodGroup: '',
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Fetch the donor's profile details
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.profile = data; // Populate profile data
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      },
    });
  }

  onSubmit() {
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
