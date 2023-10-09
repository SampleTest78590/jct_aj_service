import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioRootComponent } from './audio-root.component';

describe('AudioRootComponent', () => {
  let component: AudioRootComponent;
  let fixture: ComponentFixture<AudioRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
