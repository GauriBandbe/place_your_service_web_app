import { TestBed } from '@angular/core/testing';

import { PatientVisitDetailsService } from './patient-visit-details.service';

describe('PatientVisitDetailsService', () => {
  let service: PatientVisitDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientVisitDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
