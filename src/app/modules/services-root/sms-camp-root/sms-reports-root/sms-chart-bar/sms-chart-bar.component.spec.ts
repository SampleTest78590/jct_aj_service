import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMSChartBarComponent } from './sms-chart-bar.component';

describe('SMSChartBarComponent', () => {
  let component: SMSChartBarComponent;
  let fixture: ComponentFixture<SMSChartBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SMSChartBarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SMSChartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
