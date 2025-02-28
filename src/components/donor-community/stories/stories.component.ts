import { Component, OnInit, Input } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommunityStoriesService } from '../../../services/community.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.scss'
})
export class StoriesComponent implements OnInit {
  approvedStories: any[] = [];
  userStories: any[] = [];
  newStory = { title: '', content: '', userId: 0 };
  userId: number = 0;

  constructor(private communityService: CommunityStoriesService) {}

  ngOnInit() {
    this.userId = Number(localStorage.getItem('userId')) || 0; // Fetch user ID
    this.loadStories();
  }

  loadStories() {
    this.communityService.getApprovedStories().subscribe({
      next: (data: any[]) => (this.approvedStories = data),
      error: (err: any) => console.error('Error loading stories:', err),
    });

    if (this.userId) {
      this.communityService.getUserStories(this.userId).subscribe({
        next: (data: any[]) => (this.userStories = data.filter(story => story.status === 'PENDING')),
        error: (err: any) => console.error('Error loading user stories:', err),
      });
    }
  }

  submitStory() {
    if (this.newStory.title.trim() && this.newStory.content.trim()) {
      this.newStory.userId = this.userId;
      this.communityService.createStory(this.userId, this.newStory.title, this.newStory.content).subscribe({
        next: () => {
          alert('Story submitted for approval!');
          this.loadStories();
          this.newStory = { title: '', content: '', userId: this.userId };
        },
        error: (err: any) => console.error('Error posting story:', err),
      });
    } else {
      alert('Please provide both a title and content.');
    }
  }


}
