import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMesasgeModalComponent } from './custom-message-modal.component';

describe('CustomMesasgeModalComponent', () => {
  let component: CustomMesasgeModalComponent;
  let fixture: ComponentFixture<CustomMesasgeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomMesasgeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMesasgeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
