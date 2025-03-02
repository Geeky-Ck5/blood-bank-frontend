import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { MessagesComponent } from '../components/messages/messages.component';
import {MainComponent} from '../components/main/main.component';
import {NgIf} from '@angular/common';
import {ChatWidgetComponent} from '../components/chat-widget/chat-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [MessagesComponent, RouterOutlet, MainComponent, NgIf, ChatWidgetComponent] // Import MessagesComponent
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkLoginState();
  }

  /**
   * Check if the user is logged in based on the presence of a token in localStorage.
   */
  checkLoginState() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token; // Convert token existence into a boolean
  }

  /**
   * Handle logout by clearing session and redirecting to the login page.
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');

    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
