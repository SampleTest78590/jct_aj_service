import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedReportsRootComponent } from './missed-reports-root.component';

describe('MissedReportsRootComponent', () => {
  let component: MissedReportsRootComponent;
  let fixture: ComponentFixture<MissedReportsRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedReportsRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissedReportsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
