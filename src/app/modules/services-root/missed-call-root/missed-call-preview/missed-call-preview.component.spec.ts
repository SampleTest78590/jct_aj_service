import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedCallPreviewComponent } from './missed-call-preview.component';

describe('MissedCallPreviewComponent', () => {
  let component: MissedCallPreviewComponent;
  let fixture: ComponentFixture<MissedCallPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedCallPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissedCallPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
