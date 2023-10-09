import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLeadListComponent } from './upload-lead-list.component';

describe('UploadLeadListComponent', () => {
  let component: UploadLeadListComponent;
  let fixture: ComponentFixture<UploadLeadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadLeadListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
