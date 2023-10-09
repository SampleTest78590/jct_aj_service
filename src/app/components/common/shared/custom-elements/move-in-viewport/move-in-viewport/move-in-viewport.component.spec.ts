import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveInViewportComponent } from './move-in-viewport.component';

describe('MoveInViewportComponent', () => {
    let component: MoveInViewportComponent;
    let fixture: ComponentFixture<MoveInViewportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MoveInViewportComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MoveInViewportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
