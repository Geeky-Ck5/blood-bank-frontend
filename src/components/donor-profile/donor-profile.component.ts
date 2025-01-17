import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CentersService } from '../../services/centers.service';

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
    autoReminders: false,
  };
  centers: any[] = [];

  constructor(private authService: AuthService,private centersService: CentersService) {}

  ngOnInit() {
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
