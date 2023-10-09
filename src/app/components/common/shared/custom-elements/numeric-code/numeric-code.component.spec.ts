import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericCodeComponent } from './numeric-code.component';

describe('NumericCodeComponent', () => {
    let component: NumericCodeComponent;
    let fixture: ComponentFixture<NumericCodeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NumericCodeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NumericCodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
