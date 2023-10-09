import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationNumberComponent } from './destination-number.component';

describe('DestinationNumberComponent', () => {
  let component: DestinationNumberComponent;
  let fixture: ComponentFixture<DestinationNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
