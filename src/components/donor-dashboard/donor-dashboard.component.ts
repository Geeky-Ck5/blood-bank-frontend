import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-donor-dashboard',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './donor-dashboard.component.html',
  styleUrl: './donor-dashboard.component.scss'
})
export class DonorDashboardComponent {
  donorName: string = 'John Doe';
}
