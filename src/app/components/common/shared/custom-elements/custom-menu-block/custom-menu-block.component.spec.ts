import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMenuBlockComponent } from './custom-menu-block.component';

describe('CustomMenuBlockComponent', () => {
    let component: CustomMenuBlockComponent;
    let fixture: ComponentFixture<CustomMenuBlockComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CustomMenuBlockComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CustomMenuBlockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
