import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [

    NgForOf,
    NgIf
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqs = [
    {
      question: 'Why ask so many personal questions when I give blood?',
      answer:
        'Personal questions ensure the safety of both the donor and the recipient by assessing eligibility.',
      isExpanded: true,
    },
    {
      question: 'How often can I donate blood?',
      answer: 'You can donate whole blood every 56 days, up to 6 times a year.',
      isExpanded: false,
    },
    {
      question: 'Who can donate blood?',
      answer:
        'Anyone in good health, above 17 years old, and meeting the weight requirements can donate.',
      isExpanded: false,
    },
    {
      question: 'Can I donate after receiving the COVID-19 vaccination?',
      answer:
        'Yes, you can donate blood after receiving the COVID-19 vaccine. There is no waiting period.',
      isExpanded: false,
    },
    {
      question: 'What if I have tested positive for COVID-19 in the last 10 days?',
      answer:
        'You should wait at least 10 days after recovery and being symptom-free before donating.',
      isExpanded: false,
    },
    {
      question: 'What if I take medications?',
      answer:
        'Some medications may prevent you from donating blood. Please check with your healthcare provider.',
      isExpanded: false,
    },
    {
      question: 'Dental Procedures and Oral Surgery',
      answer:
        'You can donate blood 24 hours after minor dental procedures or 72 hours after major surgery.',
      isExpanded: false,
    },
    {
      question: 'Unable to Give Blood?',
      answer:
        'If you’re unable to donate blood, you can still help by volunteering or organizing blood drives.',
      isExpanded: false,
    },
  ];

  toggleAnswer(faq: any) {
    faq.isExpanded = !faq.isExpanded;
  }
}
