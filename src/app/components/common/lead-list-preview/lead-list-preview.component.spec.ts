import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadListPreviewComponent } from './lead-list-preview.component';

describe('LeadListPreviewComponent', () => {
  let component: LeadListPreviewComponent;
  let fixture: ComponentFixture<LeadListPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadListPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadListPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
