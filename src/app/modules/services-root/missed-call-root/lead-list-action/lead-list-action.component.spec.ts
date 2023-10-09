import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadListActionComponent } from './lead-list-action.component';

describe('LeadListActionComponent', () => {
  let component: LeadListActionComponent;
  let fixture: ComponentFixture<LeadListActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadListActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadListActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
