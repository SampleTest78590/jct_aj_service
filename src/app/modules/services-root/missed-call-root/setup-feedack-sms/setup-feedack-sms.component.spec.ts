import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupFeedackSmsComponent } from './setup-feedack-sms.component';

describe('SetupFeedackSmsComponent', () => {
  let component: SetupFeedackSmsComponent;
  let fixture: ComponentFixture<SetupFeedackSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupFeedackSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupFeedackSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
