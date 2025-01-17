import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationFeedbackComponent } from './donation-feedback.component';

describe('DonationFeedbackComponent', () => {
  let component: DonationFeedbackComponent;
  let fixture: ComponentFixture<DonationFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
