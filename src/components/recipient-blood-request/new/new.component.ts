import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BloodRequestService } from '../../../services/blood-request.service';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {
  userId = 1;
  request = {
    bloodGroup: '',
    unitsRequested: 1,
    priority: 'normal',
    reason: '',
    requestDate: new Date().toISOString().split('T')[0], // Auto-sets today’s date
    status: 'PENDING'
  };

  constructor(private bloodRequestService: BloodRequestService) {}

  onSubmit() {
    if (!this.request.bloodGroup || !this.request.unitsRequested) {
      this.userId = Number(localStorage.getItem('userId')) || 0; // Fetch user ID
      alert('Please fill in all required fields.');
      return;
    }

    this.bloodRequestService.submitBloodRequest(this.userId, this.request).subscribe({
      next: (response) => {
        alert('Your blood request has been submitted.');
        console.log('Blood request submitted:', response);
      },
      error: (err) => {
        console.error('Error submitting blood request:', err);
        alert('Failed to submit blood request. Please try again.');
      },
    });
  }
}
