import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientUsersListComponent } from './patient-users-list.component';

describe('PatientUsersListComponent', () => {
  let component: PatientUsersListComponent;
  let fixture: ComponentFixture<PatientUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientUsersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
