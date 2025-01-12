import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientSignupComponent } from './recipient-signup.component';

describe('RecipientSignupComponent', () => {
  let component: RecipientSignupComponent;
  let fixture: ComponentFixture<RecipientSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipientSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipientSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
