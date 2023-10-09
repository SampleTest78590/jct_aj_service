import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-month-view',
    templateUrl: './month-view.component.html',
    styleUrls: ['./month-view.component.scss'],
})
export class MonthViewComponent implements OnInit, AfterViewInit {
    @Input() currentViewDate: Date;
    @Output() dateChange: EventEmitter<any> = new EventEmitter<any>();

    months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    currentDateMonthIndex: number;

    constructor(private el: ElementRef) {}

    ngOnInit(): void {
        this.currentDateMonthIndex = this.currentViewDate.getMonth();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const elem = this.el.nativeElement.querySelector('.primary-button');
            if (elem) {
                elem.scrollIntoView({ block: 'center' });
            }
        });
    }

    handleDateSelection(monthIndex: number): void {
        if (this.currentViewDate) {
            const date = new Date(this.currentViewDate);
            date.setMonth(monthIndex);
            this.dateChange.emit(date);
        }
    }
}
