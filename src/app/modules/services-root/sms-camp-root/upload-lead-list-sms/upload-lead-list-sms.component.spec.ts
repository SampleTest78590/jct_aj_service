import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLeadListSmsComponent } from './upload-lead-list-sms.component';

describe('UploadLeadListSmsComponent', () => {
  let component: UploadLeadListSmsComponent;
  let fixture: ComponentFixture<UploadLeadListSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadLeadListSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadLeadListSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
