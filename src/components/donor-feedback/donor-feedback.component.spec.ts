import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorFeedbackComponent } from './donor-feedback.component';

describe('DonorFeedbackComponent', () => {
  let component: DonorFeedbackComponent;
  let fixture: ComponentFixture<DonorFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonorFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
