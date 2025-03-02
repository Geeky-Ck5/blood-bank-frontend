import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notifications.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  imports: [
    NgForOf,
    NgIf,
    DatePipe
  ],
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  unreadCount: number = 0;
  userId: number | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.userId = Number(localStorage.getItem('userId'));
    if (this.userId) {
      this.loadNotifications();
    }
  }

  loadNotifications() {
    this.notificationService.getNotifications(this.userId!).subscribe({
      next: (data) => {
        this.notifications = data;
        this.unreadCount = data.filter(n => n.status === 'UNREAD').length;
      },
      error: (err) => console.error('Error loading notifications:', err),
    });
  }

  markAsRead(notificationId: number) {
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () => {
        const notification = this.notifications.find(n => n.notificationId === notificationId);
        if (notification) {
          notification.status = 'READ';
          this.unreadCount--; // Reduce unread count
        }
      },
      error: (err) => console.error('Error marking notification as read:', err),
    });
  }
}
