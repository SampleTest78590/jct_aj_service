import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsConfigurePopupComponent } from './sms-configure-popup.component';

describe('SmsConfigurePopupComponent', () => {
  let component: SmsConfigurePopupComponent;
  let fixture: ComponentFixture<SmsConfigurePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsConfigurePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsConfigurePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
