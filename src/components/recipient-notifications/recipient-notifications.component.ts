import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipient-notifications',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './recipient-notifications.component.html',
  styleUrl: './recipient-notifications.component.scss'
})
export class RecipientNotificationsComponent implements  OnInit {
  role: 'donor' | 'recipient' = 'recipient'; // Default to recipient
  notifications: any[] = [];

  constructor(private notificationsService: NotificationsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.role = this.route.snapshot.data['role'] || 'donor'; // Default to donor
    this.loadNotifications();
    if (this.role === 'donor') {
      this.loadEligibilityReminders();
    }
  }

  loadNotifications() {
    this.notificationsService.getNotifications(this.role).subscribe({
      next: (data) => {
        this.notifications = data;
      },
      error: (err) => {
        console.error('Error loading notifications:', err);
      },
    });
  }

  markAsRead(notificationId: number) {
    this.notificationsService.markNotificationAsRead(notificationId).subscribe({
      next: () => {
        const notification = this.notifications.find((n) => n.id === notificationId);
        if (notification) notification.isRead = true;
        console.log('Notification marked as read.');
      },
      error: (err) => {
        console.error('Error marking notification as read:', err);
      },
    });
  }


  loadEligibilityReminders() {
    this.notificationsService.getEligibilityReminders().subscribe({
      next: (data) => {
        // Add eligibility reminders to the notification list
        this.notifications = [...this.notifications, ...data];
      },
      error: (err) => {
        console.error('Error loading eligibility reminders:', err);
      },
    });
  }
}
