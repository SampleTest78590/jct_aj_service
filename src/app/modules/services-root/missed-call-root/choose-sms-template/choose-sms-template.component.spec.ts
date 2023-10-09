import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSMSTemplateComponent } from './choose-sms-template.component';

describe('ChooseSMSTemplateComponent', () => {
  let component: ChooseSMSTemplateComponent;
  let fixture: ComponentFixture<ChooseSMSTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseSMSTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseSMSTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
