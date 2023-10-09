import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSmsSectionComponent } from './number-sms-section.component';

describe('NumberSmsSectionComponent', () => {
  let component: NumberSmsSectionComponent;
  let fixture: ComponentFixture<NumberSmsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberSmsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberSmsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
