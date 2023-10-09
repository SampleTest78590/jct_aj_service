import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JctservicesComponent } from './jctservices.component';

describe('JctservicesComponent', () => {
  let component: JctservicesComponent;
  let fixture: ComponentFixture<JctservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JctservicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JctservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
