import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorUserListComponent } from './vendor-user-list.component';

describe('VendorUserListComponent', () => {
  let component: VendorUserListComponent;
  let fixture: ComponentFixture<VendorUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
