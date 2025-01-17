import { Component, OnInit, Input } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommunityService } from '../../../services/community.service';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.scss'
})
export class StoriesComponent implements OnInit {
  @Input() role: 'donor' | 'recipient' = 'donor'; // Default to 'donor'
  stories: any[] = [];
  newStory = {
    title: '',
    content: '',
  };

  constructor(private communityService: CommunityService) {}

  ngOnInit() {
    this.loadStories();
  }

  loadStories() {
    this.communityService.getCommunityStories(this.role).subscribe({
      next: (data) => {
        this.stories = data;
      },
      error: (err) => {
        console.error('Error loading stories:', err);
      },
    });
  }

  onShareStory() {
    this.communityService.shareCommunityStory(this.role, this.newStory).subscribe({
      next: (response) => {
        alert('Your story has been shared!');
        this.stories.push(response);
        this.newStory = { title: '', content: '' };
      },
      error: (err) => {
        console.error('Error sharing story:', err);
      },
    });
  }

}
