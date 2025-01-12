import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
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
  request = {
    bloodType: '',
    quantity: 1,
    urgency: 'normal',
    reason: '',
  };

  constructor(private bloodRequestService: BloodRequestService) {}

  onSubmit() {
    this.bloodRequestService.submitBloodRequest(this.request).subscribe({
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
