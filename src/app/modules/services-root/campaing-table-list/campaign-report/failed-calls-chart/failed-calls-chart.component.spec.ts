import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedCallsChartComponent } from './failed-calls-chart.component';

describe('FailedCallsChartComponent', () => {
  let component: FailedCallsChartComponent;
  let fixture: ComponentFixture<FailedCallsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedCallsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedCallsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
