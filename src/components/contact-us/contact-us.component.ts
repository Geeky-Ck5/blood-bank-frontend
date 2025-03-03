import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  contactData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  onSubmit() {
    if (this.contactData.name && this.contactData.email && this.contactData.subject && this.contactData.message) {
      console.log('Contact form submitted:', this.contactData);
      alert('Thank you for reaching out! We will get back to you soon.');
      this.contactData = { name: '', email: '', subject: '', message: '' };
    }
  }
}
