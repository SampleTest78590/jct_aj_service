import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpanedCollapseComponent } from './expaned-collapse.component';

describe('ExpanedCollapseComponent', () => {
    let component: ExpanedCollapseComponent;
    let fixture: ComponentFixture<ExpanedCollapseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExpanedCollapseComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ExpanedCollapseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
