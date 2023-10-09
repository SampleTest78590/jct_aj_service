import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignScheduleComponent } from './campaign-schedule.component';

describe('CampaignScheduleComponent', () => {
  let component: CampaignScheduleComponent;
  let fixture: ComponentFixture<CampaignScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
