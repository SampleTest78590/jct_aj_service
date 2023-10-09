import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSmsComponent } from './add-new-sms.component';

describe('AddNewSmsComponent', () => {
  let component: AddNewSmsComponent;
  let fixture: ComponentFixture<AddNewSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
