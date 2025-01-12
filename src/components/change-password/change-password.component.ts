import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      alert('New Password and Confirm Password do not match.');
      return;
    }

    this.authService.changePassword(this.passwordData).subscribe({
      next: (response) => {
        console.log('Password changed successfully:', response);
        alert('Your password has been updated!');
        this.passwordData = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        };
      },
      error: (err) => {
        console.error('Error changing password:', err);
        alert('Failed to update password. Please try again.');
      },
    });
  }
}
