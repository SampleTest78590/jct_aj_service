import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignRootComponent } from './campaign-root.component';

describe('CampaignRootComponent', () => {
  let component: CampaignRootComponent;
  let fixture: ComponentFixture<CampaignRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
