import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaingTableListComponent } from './campaing-table-list.component';

describe('CampaingTableListComponent', () => {
  let component: CampaingTableListComponent;
  let fixture: ComponentFixture<CampaingTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaingTableListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaingTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
