import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalUsersListComponent } from './hospital-users-list.component';

describe('HospitalUsersListComponent', () => {
  let component: HospitalUsersListComponent;
  let fixture: ComponentFixture<HospitalUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalUsersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
