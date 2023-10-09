import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsCampMgmtComponent } from './sms-camp-mgmt.component';

describe('SmsCampMgmtComponent', () => {
  let component: SmsCampMgmtComponent;
  let fixture: ComponentFixture<SmsCampMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsCampMgmtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsCampMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
