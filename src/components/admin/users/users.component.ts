import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: any[] = []; // Store all users

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  // Fetch all users
  fetchUsers(): void {
    this.http.get('http://localhost:8080/api/basic-details').subscribe({
      next: (response: any) => {
        this.users = response;
        console.log('Users fetched:', this.users);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  // Toggle user status
  toggleStatus(user: any): void {
    const newStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

    this.http
      .put(`http://localhost:8080/api/${user.userId}/status`, { status: newStatus })
      .subscribe({
        next: () => {
          user.status = newStatus; // Update UI after successful toggle
          console.log(`User status updated to ${newStatus}`);
        },
        error: (err) => {
          console.error('Error updating status:', err);
        }
      });
  }

}
