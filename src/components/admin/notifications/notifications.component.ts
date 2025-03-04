import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notifications.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  templateUrl: './notifications.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  selectedUsers: number[] = [];
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  selectedBloodGroup: string = '';
  onlyEligible = false;
  messageText: string = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadUsers();
  }

  /**
   * ✅ Fetch All Users
   */
  loadUsers() {
    this.notificationService.getAllUsers().subscribe({
      next: (data: any[]) => {
        this.users = data;
        this.applyFilters();
      },
      error: (err: any) => console.error('Error fetching users:', err)
    });
  }

  /**
   * ✅ Apply Blood Group and Eligibility Filters
   */
  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      const matchesBloodGroup = this.selectedBloodGroup ? user.bloodGroup === this.selectedBloodGroup : true;
      const matchesEligibility = this.onlyEligible ? user.eligibilityStatus === true : true;
      return matchesBloodGroup && matchesEligibility;
    });
  }

  /**
   * ✅ Select or Deselect a User for Notification
   */
  toggleUserSelection(userId: number) {
    if (this.selectedUsers.includes(userId)) {
      this.selectedUsers = this.selectedUsers.filter(id => id !== userId);
    } else {
      this.selectedUsers.push(userId);
    }
  }

  /**
   * ✅ Send Bulk Notification
   */
  sendBulkNotification() {
    if (this.selectedUsers.length === 0) {
      alert('Please select at least one user to send a notification.');
      return;
    }
    if (!this.messageText.trim()) {
      alert('Please enter a message.');
      return;
    }

    this.notificationService.sendBulkNotifications(this.selectedUsers, this.messageText).subscribe({
      next: () => {
        alert('Notification sent successfully!');
        this.selectedUsers = []; // Clear selection after sending
      },
      error: (err: any) => {
        console.error('Error sending notifications:', err);
        alert('Failed to send notifications.');
      }
    });
  }
}
