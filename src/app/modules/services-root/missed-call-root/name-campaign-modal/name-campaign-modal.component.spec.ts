import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameCampaignModalComponent } from './name-campaign-modal.component';

describe('NameCampaignModalComponent', () => {
  let component: NameCampaignModalComponent;
  let fixture: ComponentFixture<NameCampaignModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameCampaignModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameCampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
