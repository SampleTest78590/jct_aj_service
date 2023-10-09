import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoveInViewportModule } from '../move-in-viewport/move-in-viewport.module';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { DateViewComponent } from './calendar-view/date-view/date-view.component';
import { MonthViewComponent } from './calendar-view/month-view/month-view.component';
import { YearViewComponent } from './calendar-view/year-view/year-view.component';
import { TimeViewComponent } from 'src/app/modules/services-root/time-view/time-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TooltipModule } from '../custom-tooltip/tooltip.module';

@NgModule({
    declarations: [
        CalendarViewComponent,
        TimeViewComponent,
        DateViewComponent,
        MonthViewComponent,
        YearViewComponent,
    ],
    imports: [CommonModule, MoveInViewportModule,FlexLayoutModule,TooltipModule],
    exports: [CalendarViewComponent,TimeViewComponent],
})
export class CustomCalendarModule {}
