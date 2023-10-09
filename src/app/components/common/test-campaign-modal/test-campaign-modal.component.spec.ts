import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCampaignModalComponent } from './test-campaign-modal.component';

describe('TestCampaignModalComponent', () => {
  let component: TestCampaignModalComponent;
  let fixture: ComponentFixture<TestCampaignModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCampaignModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
