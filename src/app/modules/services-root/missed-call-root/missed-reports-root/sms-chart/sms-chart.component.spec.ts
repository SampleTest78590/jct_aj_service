import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsChartComponent } from './sms-chart.component';

describe('SmsChartComponent', () => {
  let component: SmsChartComponent;
  let fixture: ComponentFixture<SmsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
