import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-date-view',
    templateUrl: './date-view.component.html',
    styleUrls: ['./date-view.component.scss'],
})
export class DateViewComponent implements OnInit {
    @Input() set currentViewDate(date: Date) {
        this.monthStart = new Date(
            new Date((date || new Date()).setDate(1)).setHours(0, 0, 1, 0)
        );
        this.monthEnd = new Date(
            this.monthStart.getFullYear(),
            this.monthStart.getMonth() + 1,
            0
        );

        this.setCalendarView();
    }

    get currentViewDate(): Date {
        return this.monthStart;
    }

    _firstDate: Date | undefined;
    @Input() set firstDate(date: Date | undefined) {
        this._firstDate = date;
        this.setCalendarView();
    }

    get firstDate(): Date | undefined {
        return this._firstDate;
    }

    _secondDate: Date | undefined;
    @Input() set secondDate(date: Date | undefined) {
        this._secondDate = date;
        this.setCalendarView();
    }

    get secondDate(): Date | undefined {
        return this._secondDate;
    }
    @Input() _min: any;
    @Input() set min(date: Date | undefined) {
        this._min = date;
        this.setCalendarView();
    }

    get min(): Date | undefined {
        return this._min;
    }
    @Input() _max: any;
    @Input() set max(date: Date | undefined) {
        this._max = date;
        this.setCalendarView();
    }

    get max(): Date | undefined {
        return this._max;
    }
    @Output() dateChange = new EventEmitter<Date>();
    @Output() prevMonth = new EventEmitter<void>();
    @Output() nextMonth = new EventEmitter<void>();

    weekDays = [
        {
            day: 0,
            name: 'Sunday',
            abbr: 'S',
        },
        {
            day: 1,
            name: 'Monday',
            abbr: 'M',
        },
        {
            day: 2,
            name: 'Tuesday',
            abbr: 'T',
        },
        {
            day: 3,
            name: 'Wednesday',
            abbr: 'W',
        },
        {
            day: 4,
            name: 'Thursday',
            abbr: 'T',
        },
        {
            day: 5,
            name: 'Friday',
            abbr: 'F',
        },
        {
            day: 6,
            name: 'Saturday',
            abbr: 'S',
        },
    ];

    weekRows: Array<Array<any>> = [];

    monthStart: Date;
    monthEnd: Date;
    private swipeCoord?: [number, number] = [0, 0];
    private swipeTime?: number;

    constructor() { }

    ngOnInit(): void { }

    setCalendarView(): void {
        const start = this.monthStart;
        const end = this.monthEnd;
        const startDay = start.getDay();
        const prefillArr = new Array(startDay).fill(void 0);
        const weeksArr: any = [];

        let weekIndex = 0;

        const startDate = start.getDate();
        const endDate = end.getDate();

        weeksArr.push(prefillArr);
        for (let i = startDate; i <= endDate; i++) {
            if (weeksArr[weekIndex].length === 7) {
                weeksArr.push([]);
                weekIndex++;
            }
            weeksArr[weekIndex].push({
                date: i,
                classes: this.getDateClasses(i),
            });
        }

        this.weekRows = weeksArr;
    }

    getDateClasses(date: number): string {
        const todayDate = new Date();
        let returnStr = '';

        const dummyDate = new Date(this.currentViewDate);
        dummyDate.setDate(date);
        if (
            (this.firstDate &&
                this.checkDateEquality(dummyDate, this.firstDate)) ||
            (this.secondDate &&
                this.checkDateEquality(dummyDate, this.secondDate))
        ) {
            returnStr = 'primary-button';
        } else {
            if (this.checkDateEquality(dummyDate, todayDate)) {
                returnStr = 'today-date ';
            }

            if (this.isDateBetweenRange(dummyDate)) {
                returnStr += 'date-between ';
            }

            if (dummyDate < new Date(new Date(this._min).setHours(0, 0, 1, 0)) && this._min) {
                returnStr += 'disabled '
            }
            if (dummyDate > new Date(new Date(this._max).setHours(0, 0, 1, 0)) && this._max) {
                returnStr += 'disabled '
            }
            returnStr += 'tertiary-button';
        }

        return returnStr;
    }

    checkDateEquality(dateA: Date, dateB: Date): boolean {
        if (dateB) {
            return (
                dateA.getDate() === dateB.getDate() &&
                dateA.getMonth() === dateB.getMonth() &&
                dateA.getFullYear() === dateB.getFullYear()
            );
        } {
            return false;
        }

    }

    isDateBetweenRange(date: Date): boolean {
        return (
            !!this.firstDate &&
            !!this.secondDate &&
            date.getTime() > this.firstDate?.getTime() &&
            date.getTime() < this.secondDate?.getTime()
        );
    }

    handleDateSelection(newDate: number): void {
        if (this.currentViewDate) {
            const date = new Date(this.currentViewDate);
            date.setDate(newDate);
            this.dateChange.emit(date);
        }
    }

    swipe(e: TouchEvent, when: 'start' | 'end'): void {
        const coord: [number, number] = [
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY,
        ];
        const time = new Date().getTime();

        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        } else if (when === 'end' && this.swipeCoord && this.swipeTime) {
            const direction = [
                coord[0] - this.swipeCoord[0],
                coord[1] - this.swipeCoord[1],
            ];
            const duration = time - this.swipeTime;

            if (
                duration < 1000 && // prettier
                Math.abs(direction[0]) > 30 &&
                Math.abs(direction[0]) > Math.abs(direction[1] * 3)
            ) {
                if (direction[0] < 0) {
                    this.nextMonth.emit();
                } else {
                    this.prevMonth.emit();
                }
            }
        }
    }
}
