import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-year-view',
    templateUrl: './year-view.component.html',
    styleUrls: ['./year-view.component.scss'],
})
export class YearViewComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() currentViewDate: Date;
    @Output() dateChange: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('bottomAnchor') bottomAnchorRef?: ElementRef<HTMLElement>;
    @ViewChild('topAnchor') topAnchorRef?: ElementRef<HTMLElement>;

    observer?: IntersectionObserver;
    currentDateYear: any;
    years: number[] = [];

    yearRange = 60;

    constructor(private el: ElementRef) {}

    ngOnInit(): void {
        this.currentDateYear = this.currentViewDate.getFullYear();

        if (this.currentDateYear || this.currentDateYear === 0) {
            const yearGenRange = this.yearRange / 2;
            const start =
                this.currentDateYear - yearGenRange >= 0
                    ? this.currentDateYear - yearGenRange
                    : 0;
            const end = this.currentDateYear + yearGenRange;
            this.years = this.getNumberArray(start, end);
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const elem = this.el.nativeElement.querySelector('.primary-button');
            if (elem) {
                elem.scrollIntoView({ block: 'center' });
            }
            this.handleIntersectionObserver();
        });
    }

    ngOnDestroy(): void {
        this.observer && this.observer.disconnect();
    }

    getNumberArray(start: number, end: number): Array<number> {
        return Array.from(Array(end - start).keys()).map((n) => start + n);
    }

    handleIntersectionObserver(): void {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(([entry]) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const anchor = entry.target as HTMLElement;
                if (!anchor.dataset || !anchor.dataset['position']) {
                    return;
                }

                if (anchor.dataset['position'] === 'top') {
                    if (this.years[0] !== 0) {
                        const start =
                            this.years[0] - this.yearRange >= 0
                                ? this.years[0] - this.yearRange
                                : 0;
                        const end = this.years[0];
                        this.years.unshift(...this.getNumberArray(start, end));
                    }
                } else if (anchor.dataset['position'] === 'bottom') {
                    const start = this.years[this.years.length - 1] + 1;
                    const end = start + this.yearRange;
                    this.years.push(...this.getNumberArray(start, end));
                }
            }, {});

            this.bottomAnchorRef &&
                this.observer.observe(this.bottomAnchorRef.nativeElement);
            this.topAnchorRef &&
                this.observer.observe(this.topAnchorRef.nativeElement);
        }
    }

    handleDateSelection(year: any): void {
        if (this.currentViewDate) {
            const date = new Date(this.currentViewDate);
            date.setFullYear(year);
            this.dateChange.emit(date);
        }
    }
}
