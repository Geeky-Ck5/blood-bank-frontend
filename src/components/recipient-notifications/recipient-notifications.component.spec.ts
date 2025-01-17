import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientNotificationsComponent } from './recipient-notifications.component';

describe('RecipientNotificationsComponent', () => {
  let component: RecipientNotificationsComponent;
  let fixture: ComponentFixture<RecipientNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipientNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipientNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
