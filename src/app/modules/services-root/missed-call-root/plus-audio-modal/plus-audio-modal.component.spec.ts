import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusAudioModalComponent } from './plus-audio-modal.component';

describe('PlusAudioModalComponent', () => {
  let component: PlusAudioModalComponent;
  let fixture: ComponentFixture<PlusAudioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlusAudioModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlusAudioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
