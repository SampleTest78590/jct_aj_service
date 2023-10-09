import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsLineChartComponent } from './calls-line-chart.component';

describe('CallsLineChartComponent', () => {
  let component: CallsLineChartComponent;
  let fixture: ComponentFixture<CallsLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallsLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallsLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
