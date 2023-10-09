import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSingleLeadComponent } from './upload-single-lead.component';

describe('UploadSingleLeadComponent', () => {
  let component: UploadSingleLeadComponent;
  let fixture: ComponentFixture<UploadSingleLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSingleLeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSingleLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
