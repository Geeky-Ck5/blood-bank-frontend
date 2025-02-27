import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import {GoogleMap, MapMarker} from '@angular/google-maps';
import {DatePipe, NgForOf, NgIf} from '@angular/common';


@Component({
  selector: 'app-donor-events',
  standalone: true,
  imports: [
    GoogleMap,
    MapMarker,
    DatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './donor-events.component.html',
  styleUrl: './donor-events.component.scss'
})
export class DonorEventsComponent implements OnInit {
  center = { lat: 0, lng: 0 };
  zoom = 12;
  events: any[] = [];
  selectedEvent: any = null;

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.getUserLocation();
    this.loadEvents();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  loadEvents() {
    this.eventsService.getNearbyEvents(this.center.lat, this.center.lng).subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => {
        console.error('Error loading events:', err);
      },
    });
  }

  onMarkerClick(event: any) {
    this.selectedEvent = event;
  }

  onRegister(eventId: number) {
    this.eventsService.registerForEvent(eventId).subscribe({
      next: () => {
        alert('You have successfully registered for this event!');
      },
      error: (err) => {
        console.error('Error registering for event:', err);
      },
    });
  }

}
