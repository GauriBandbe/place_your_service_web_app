import { TestBed } from '@angular/core/testing';

import { AppointmentSchedulerService } from './appointment-scheduler.service';

describe('AppointmentSchedulerService', () => {
  let service: AppointmentSchedulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentSchedulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); 
  });
});
