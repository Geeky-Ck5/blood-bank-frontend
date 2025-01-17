import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-recipient-notifications',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './recipient-notifications.component.html',
  styleUrl: './recipient-notifications.component.scss'
})
export class RecipientNotificationsComponent implements  OnInit {
  notifications: any[] = [];

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationsService.getRecipientNotifications().subscribe({
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
        const notification = this.notifications.find(
          (n) => n.id === notificationId
        );
        if (notification) notification.isRead = true;
        console.log('Notification marked as read.');
      },
      error: (err) => {
        console.error('Error marking notification as read:', err);
      },
    });
  }
}
