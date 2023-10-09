import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedCallMgnComponent } from './missed-call-mgn.component';

describe('MissedCallMgnComponent', () => {
  let component: MissedCallMgnComponent;
  let fixture: ComponentFixture<MissedCallMgnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedCallMgnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissedCallMgnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
