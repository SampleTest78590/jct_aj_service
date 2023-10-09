import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoveInViewportComponent } from './move-in-viewport/move-in-viewport.component';

@NgModule({
    declarations: [MoveInViewportComponent],
    imports: [CommonModule],
    exports: [MoveInViewportComponent],
})
export class MoveInViewportModule {}
