import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMSOtherStatsComponent } from './sms-other-stats.component';

describe('SMSOtherStatsComponent', () => {
  let component: SMSOtherStatsComponent;
  let fixture: ComponentFixture<SMSOtherStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SMSOtherStatsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SMSOtherStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
