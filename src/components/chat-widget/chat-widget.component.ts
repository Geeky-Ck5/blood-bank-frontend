import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  templateUrl: './chat-widget.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrl: './chat-widget.component.scss'
})
export class ChatWidgetComponent implements OnInit {
  isOpen = false; // Controls chat visibility
  messages: any[] = [];
  newMessage: string = '';
  userId: number | null = null;
  recipientId: number | null = 1; // Default recipient (Admin)
  role: string | null = '';

  constructor(private messagingService: MessagingService) {}

  ngOnInit() {
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
    this.role = localStorage.getItem('role');

    // Auto-fetch messages every 5 seconds
    setInterval(() => this.fetchMessages(), 5000);
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.fetchMessages();
    }
  }

  fetchMessages() {
    if (this.userId) {
      this.messagingService.getMessagesForUser(this.userId).subscribe({
        next: (data) => this.messages = data,
        error: (err) => console.error('Error fetching messages:', err),
      });
    }
  }

  sendMessage() {
    if (!this.userId || !this.recipientId) {
      console.error("User ID or Recipient ID is missing.");
      return; // Prevents calling the function with null values
    }

    const messageData = {
      senderId: this.userId,
      recipientId: this.recipientId,
      message: this.newMessage.trim(),
    };

    if (!messageData.message) {
      console.error("Cannot send an empty message.");
      return;
    }

    this.messagingService.sendMessage(messageData).subscribe({
      next: () => {
        this.messages.push(messageData); // Add message to UI
        this.newMessage = ''; // Clear input after sending
      },
      error: (err) => console.error('Error sending message:', err),
    });
  }
}
