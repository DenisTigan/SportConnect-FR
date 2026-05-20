import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsHeader } from './details-header';

describe('DetailsHeader', () => {
  let component: DetailsHeader;
  let fixture: ComponentFixture<DetailsHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
