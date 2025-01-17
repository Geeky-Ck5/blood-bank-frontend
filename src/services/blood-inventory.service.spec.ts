import { TestBed } from '@angular/core/testing';

import { BloodInventoryService } from './blood-inventory.service';

describe('BloodInventoryService', () => {
  let service: BloodInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
