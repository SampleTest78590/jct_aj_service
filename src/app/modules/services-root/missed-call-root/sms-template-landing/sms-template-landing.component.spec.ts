import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsTemplateLandingComponent } from './sms-template-landing.component';

describe('SmsTemplateLandingComponent', () => {
  let component: SmsTemplateLandingComponent;
  let fixture: ComponentFixture<SmsTemplateLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsTemplateLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsTemplateLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
