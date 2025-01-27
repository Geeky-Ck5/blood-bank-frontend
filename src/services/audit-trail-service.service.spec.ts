import { TestBed } from '@angular/core/testing';

import { AuditTrailServiceService } from './audit-trail-service.service';

describe('AuditTrailServiceService', () => {
  let service: AuditTrailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditTrailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
