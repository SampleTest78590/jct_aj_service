import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMSReportsDetailsComponent } from './sms-reports-details.component';

describe('SMSReportsDetailsComponent', () => {
  let component: SMSReportsDetailsComponent;
  let fixture: ComponentFixture<SMSReportsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SMSReportsDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SMSReportsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
