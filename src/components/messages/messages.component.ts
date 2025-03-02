import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';
import { ActivatedRoute } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    DatePipe
  ],
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  userId: number | null = null;
  conversations: any[] = [];
  messages: any[] = [];
  selectedConversation: any = null;
  newMessage: string = '';
  recipientId: number | null = 1; // Default recipient (Admin)
  role: string | null = '';
  selectedRecipientId: number | null = null;

  constructor(private messagingService: MessagingService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = Number(localStorage.getItem('userId')) || null;

    if (this.userId !== null) {
      this.loadConversations(this.userId);
    } else {
      console.error("User ID is null, cannot load conversations.");
    }
  }

  loadConversations(userId: number) {
    if (!userId) {
      console.error("Invalid userId for loading conversations.");
      return;
    }

    this.messagingService.getMessagesForUser(userId).subscribe({
      next: (conversations: any[]) => {
        this.conversations = conversations;
      },
      error: (err: any) => console.error("Error loading conversations:", err),
    });
  }


  sendMessage() {
    const senderId = Number(localStorage.getItem('userId')) || null;
    const recipientId = this.selectedRecipientId ? Number(this.selectedRecipientId) : null;

    if (!senderId || !recipientId) {
      console.error("User ID or Recipient ID is missing.");
      return; // Prevent API call if IDs are invalid
    }

    const messageData = {
      senderId,
      recipientId,
      message: this.newMessage.trim(),
    };

    if (!messageData.message) {
      console.error("Cannot send an empty message.");
      return;
    }

    this.messagingService.sendMessage(messageData).subscribe({
      next: () => {
        this.messages.push(messageData); // Update UI with the new message
        this.newMessage = ''; // Clear input after sending
      },
      error: (err) => console.error('Error sending message:', err),
    });
  }

}
