import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderIdModalComponent } from './sender-id-modal.component';

describe('SenderIdModalComponent', () => {
  let component: SenderIdModalComponent;
  let fixture: ComponentFixture<SenderIdModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenderIdModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenderIdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
