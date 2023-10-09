import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-calendar-view',
    templateUrl: './calendar-view.component.html',
    styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent implements OnInit {
    @Input() open: boolean = false;
    @Input() firstDate: Date | undefined = void 0;
    @Input() secondDate: Date | undefined = void 0;
    @Input() type: string = 'single';
    @Input() anchorEl: HTMLElement;
    @Input() min: Date | undefined = void 0;
    @Input() max: Date | undefined = void 0;
    @Output() closeCalendarCb: EventEmitter<any> = new EventEmitter<any>();
    @Output() getValues: EventEmitter<any> = new EventEmitter<any>();

    currentView: string = 'date';
    currentViewDate = new Date();

    selectedMonth: string = '';
    selectedYear: string = '';
    showDoneBtn = false;
    showClearBtn = false;

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        if (this.firstDate) {
            this.showClearBtn = true;
            this.currentViewDate = new Date(this.firstDate);
            this.firstDate = new Date(this.firstDate);
        }
        this.setValues();
    }

    setValues(): void {
        this.selectedMonth = this.currentViewDate.toLocaleString('en', {
            month: 'short',
        });

        this.selectedYear = this.currentViewDate.toLocaleString('en', {
            year: 'numeric',
        });
    }

    skipMonthBy(val: number): void {
        const dummyDate = this.currentViewDate;
        this.currentViewDate = new Date(
            dummyDate.setMonth(dummyDate.getMonth() + val)
        );
        this.setValues();
    }

    changeCurrentView(view: string): void {
        if (this.currentView === view) {
            this.currentView = 'date';
            return;
        }
        this.currentView = view;
    }

    handleViewDateChange(newDate: Date, fromView: string): void {
        this.currentViewDate = newDate;
        this.currentView = 'date';
        this.setValues();
    }

    handleDateChange(newDate: Date): void {
        switch (this.type) {
            case 'timeline':
                if (
                    !this.firstDate ||
                    newDate.getTime() < this.firstDate.getTime() ||
                    this.secondDate
                ) {
                    this.firstDate = newDate;
                    this.secondDate = void 0;
                    if (
                        new Date(
                            this.firstDate.setHours(0, 0, 0, 0)
                        ).getTime() >=
                        new Date(new Date().setHours(0, 0, 0, 0)).getTime()
                    ) {
                        this.showDoneBtn = true;
                    } else {
                        this.showDoneBtn = false;
                    }
                } else {
                    this.secondDate = newDate;
                    this.showDoneBtn = true;
                }
                break;

            case 'single':
                this.firstDate = newDate;
                this.showDoneBtn = true;
                break;
        }
    }

    closeCalendar(event: any): void {
        event.stopPropagation();
        this.open = false;
        this.closeCalendarCb.emit();
    }

    handleDone(event: any): void {
        event.stopPropagation();
        this.getValues.emit({
            start: this.firstDate,
            end: this.secondDate,
        });
    }

    handleClear(event: any): void {
        event.stopPropagation();
        this.getValues.emit({
            start: void 0,
            end: void 0,
        });
    }
}
