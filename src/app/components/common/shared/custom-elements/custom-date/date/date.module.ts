import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCalendarModule } from '../../custom-calendar/custom-calendar.module';
import { CustomDateComponent } from '../custom-date.component';

@NgModule({
    declarations: [CustomDateComponent],
    imports: [CommonModule, CustomCalendarModule],
    exports: [CustomDateComponent],
})
export class DateModule {}
