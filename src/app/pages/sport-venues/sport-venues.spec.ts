import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportVenues } from './sport-venues';

describe('SportVenues', () => {
  let component: SportVenues;
  let fixture: ComponentFixture<SportVenues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportVenues],
    }).compileComponents();

    fixture = TestBed.createComponent(SportVenues);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
