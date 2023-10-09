import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedOtherStatsComponent } from './missed-other-stats.component';

describe('MissedOtherStatsComponent', () => {
  let component: MissedOtherStatsComponent;
  let fixture: ComponentFixture<MissedOtherStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedOtherStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissedOtherStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
