import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualNumberModalComponent } from './virtual-number-modal.component';

describe('VirtualNumberModalComponent', () => {
  let component: VirtualNumberModalComponent;
  let fixture: ComponentFixture<VirtualNumberModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualNumberModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualNumberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
