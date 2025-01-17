import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodInventoryComponent } from './blood-inventory.component';

describe('BloodInventoryComponent', () => {
  let component: BloodInventoryComponent;
  let fixture: ComponentFixture<BloodInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloodInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
