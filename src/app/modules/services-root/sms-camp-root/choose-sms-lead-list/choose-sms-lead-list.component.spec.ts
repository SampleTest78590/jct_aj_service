import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSmsLeadListComponent } from './choose-sms-lead-list.component';

describe('ChooseSmsLeadListComponent', () => {
  let component: ChooseSmsLeadListComponent;
  let fixture: ComponentFixture<ChooseSmsLeadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseSmsLeadListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseSmsLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
