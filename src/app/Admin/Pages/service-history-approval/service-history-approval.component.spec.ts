import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHistoryApprovalComponent } from './service-history-approval.component';

describe('ServiceHistoryApprovalComponent', () => {
  let component: ServiceHistoryApprovalComponent;
  let fixture: ComponentFixture<ServiceHistoryApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceHistoryApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceHistoryApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
