import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedCallRootComponent } from './missed-call-root.component';

describe('MissedCallRootComponent', () => {
  let component: MissedCallRootComponent;
  let fixture: ComponentFixture<MissedCallRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedCallRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissedCallRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
