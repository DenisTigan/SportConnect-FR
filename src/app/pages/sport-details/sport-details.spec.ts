import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportDetails } from './sport-details';

describe('SportDetails', () => {
  let component: SportDetails;
  let fixture: ComponentFixture<SportDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(SportDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
