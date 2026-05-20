import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFooter } from './details-footer';

describe('DetailsFooter', () => {
  let component: DetailsFooter;
  let fixture: ComponentFixture<DetailsFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
