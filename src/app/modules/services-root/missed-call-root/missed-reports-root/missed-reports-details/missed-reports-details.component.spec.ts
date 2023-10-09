import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedReportsDetailsComponent } from './missed-reports-details.component';

describe('MissedReportsDetailsComponent', () => {
  let component: MissedReportsDetailsComponent;
  let fixture: ComponentFixture<MissedReportsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedReportsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissedReportsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
