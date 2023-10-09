import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionPopupComponent } from './terms-condition-popup.component';

describe('TermsConditionPopupComponent', () => {
  let component: TermsConditionPopupComponent;
  let fixture: ComponentFixture<TermsConditionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsConditionPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsConditionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
