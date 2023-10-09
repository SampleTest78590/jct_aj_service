import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupSmsCampModalComponent } from './setup-sms-camp-modal.component';

describe('SetupSmsCampModalComponent', () => {
  let component: SetupSmsCampModalComponent;
  let fixture: ComponentFixture<SetupSmsCampModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupSmsCampModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupSmsCampModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
