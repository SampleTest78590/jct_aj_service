import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewLeadListComponent } from './create-new-lead-list.component';

describe('CreateNewLeadListComponent', () => {
  let component: CreateNewLeadListComponent;
  let fixture: ComponentFixture<CreateNewLeadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewLeadListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
