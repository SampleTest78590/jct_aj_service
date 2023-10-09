import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSettingModalComponent } from './sms-setting-modal.component';

describe('SmsSettingModalComponent', () => {
  let component: SmsSettingModalComponent;
  let fixture: ComponentFixture<SmsSettingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsSettingModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsSettingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
