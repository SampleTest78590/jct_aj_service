import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsCampRootComponent } from './sms-camp-root.component';

describe('SmsCampRootComponent', () => {
  let component: SmsCampRootComponent;
  let fixture: ComponentFixture<SmsCampRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsCampRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsCampRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
