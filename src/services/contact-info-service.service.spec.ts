import { TestBed } from '@angular/core/testing';

import { ContactInfoServiceService } from './contact-info-service.service';

describe('ContactInfoServiceService', () => {
  let service: ContactInfoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactInfoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
