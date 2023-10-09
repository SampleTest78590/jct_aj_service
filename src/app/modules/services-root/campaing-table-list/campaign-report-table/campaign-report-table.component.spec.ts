import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignReportTableComponent } from './campaign-report-table.component';

describe('CampaignReportTableComponent', () => {
  let component: CampaignReportTableComponent;
  let fixture: ComponentFixture<CampaignReportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignReportTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
