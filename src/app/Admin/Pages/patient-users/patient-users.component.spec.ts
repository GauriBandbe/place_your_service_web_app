import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientUsersComponent } from './patient-users.component';

describe('PatientUsersComponent', () => {
  let component: PatientUsersComponent;
  let fixture: ComponentFixture<PatientUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
