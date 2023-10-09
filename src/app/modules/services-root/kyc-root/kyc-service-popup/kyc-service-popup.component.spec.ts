import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycServicePopupComponent } from './kyc-service-popup.component';

describe('KycServicePopupComponent', () => {
  let component: KycServicePopupComponent;
  let fixture: ComponentFixture<KycServicePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycServicePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycServicePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
