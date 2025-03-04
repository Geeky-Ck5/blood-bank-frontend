import { Component, OnInit } from '@angular/core';
import {CommunityStoriesService} from '../../../services/community.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-community-stories',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass
  ],
  templateUrl: './community-stories.component.html',
  styleUrl: './community-stories.component.scss'
})
export class CommunityStoriesComponent implements OnInit {
  communityStories: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private communityStoriesService: CommunityStoriesService) {}

  ngOnInit() {
    this.loadStories();
  }

  loadStories() {
    this.communityStoriesService.getAllStories().subscribe({
      next: (stories) => {
        this.communityStories = stories;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load community stories.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  approveStory(storyId: number) {
    this.communityStoriesService.updateStoryStatus(storyId, 'APPROVED').subscribe({
      next: () => {
        alert('Story Approved');
        this.loadStories();
      },
      error: (err) => {
        console.error('Error approving story:', err);
        alert('Error approving story');
      }
    });
  }

  rejectStory(storyId: number) {
    this.communityStoriesService.updateStoryStatus(storyId, 'REJECTED').subscribe({
      next: () => {
        alert('Story Rejected');
        this.loadStories();
      },
      error: (err) => {
        console.error('Error rejecting story:', err);
        alert('Error rejecting story');
      }
    });
  }
}
