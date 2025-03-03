import { Component } from '@angular/core';
import {MainComponent} from '../components/main/main.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ MainComponent],
  template: `<app-main></app-main>`,
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
