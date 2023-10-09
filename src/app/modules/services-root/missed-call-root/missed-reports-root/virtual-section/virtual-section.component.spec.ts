import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualSectionComponent } from './virtual-section.component';

describe('VirtualSectionComponent', () => {
  let component: VirtualSectionComponent;
  let fixture: ComponentFixture<VirtualSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
