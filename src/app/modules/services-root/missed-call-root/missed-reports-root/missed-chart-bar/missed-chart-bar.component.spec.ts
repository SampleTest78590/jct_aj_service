import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedChartBarComponent } from './missed-chart-bar.component';

describe('MissedChartBarComponent', () => {
  let component: MissedChartBarComponent;
  let fixture: ComponentFixture<MissedChartBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedChartBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissedChartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
