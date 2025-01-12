import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recipient-signup',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './recipient-signup.component.html',
  styleUrl: './recipient-signup.component.scss'
})
export class RecipientSignupComponent {
  recipient = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    bloodGroup: '',
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.registerRecipient(this.recipient).subscribe({
      next: (response) => {
        console.log('Recipient registered successfully:', response);
        alert('Registration successful! Please check your email to verify your account.');
      },
      error: (err) => {
        console.error('Error during registration:', err);
        alert('Registration failed. Please try again.');
      },
    });
  }
}
