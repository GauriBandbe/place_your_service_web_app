import { TestBed } from '@angular/core/testing';

import { MasterdataServiceService } from './masterdata-service.service';

describe('MasterdataServiceService', () => {
  let service: MasterdataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterdataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
