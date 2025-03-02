import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MainComponent} from '../components/main/main.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent],
  template: `<app-main></app-main>`,
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
