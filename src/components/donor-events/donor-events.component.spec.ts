import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorEventsComponent } from './donor-events.component';

describe('DonorEventsComponent', () => {
  let component: DonorEventsComponent;
  let fixture: ComponentFixture<DonorEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonorEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
