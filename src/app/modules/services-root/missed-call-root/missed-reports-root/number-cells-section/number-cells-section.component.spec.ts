import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberCellsSectionComponent } from './number-cells-section.component';

describe('NumberCellsSectionComponent', () => {
  let component: NumberCellsSectionComponent;
  let fixture: ComponentFixture<NumberCellsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberCellsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberCellsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
