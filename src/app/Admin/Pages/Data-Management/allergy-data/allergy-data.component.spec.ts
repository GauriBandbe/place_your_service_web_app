import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergyDataComponent } from './allergy-data.component';

describe('AllergyDataComponent', () => {
  let component: AllergyDataComponent;
  let fixture: ComponentFixture<AllergyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergyDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
