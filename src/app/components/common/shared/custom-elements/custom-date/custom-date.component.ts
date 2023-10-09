import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-custom-date',
    templateUrl: './custom-date.component.html',
    styleUrls: ['./custom-date.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomDateComponent),
            multi: true,
        },
    ],
})
export class CustomDateComponent implements OnInit, ControlValueAccessor {
    @Input() title: string = '';
    @Input() date: Date | undefined;

    day: string = '';
    month: string = '';
    year: string = '';

    _selectedDate: Date | undefined;
    set selectedDate(dateA: Date | undefined) {
        this._selectedDate = dateA;
        if (dateA) {
            const day = dateA.getDate();
            const month = dateA.getMonth() + 1;
            this.day = day < 10 ? '0' + day : '' + day;
            this.month = month < 10 ? '0' + month : '' + month;
            this.year = '' + dateA.getFullYear();
        } else {
            this.day = '';
            this.month = '';
            this.year = '';
        }
    }

    openDatePicker = false;
    inputDisabled = false;

    constructor() {}

    ngOnInit(): void {}

    writeValue(value: any): void {
        if (value) {
            const newDate = new Date(value);
            if (newDate && newDate instanceof Date) {
                this.selectedDate = newDate;
            }
        }
    }

    propagateChange = (_: any) => {};
    propagateTouched = (_: any) => {};

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) {
        this.propagateTouched = fn;
    }

    openCalendar(): void {
        this.openDatePicker = true;
        this.inputDisabled = true;
    }

    getDates(data: any): void {
        this.selectedDate = data.start;
        this.openDatePicker = false;
        this.propagateChange(data.start);
        this.propagateTouched(data.start);
    }

    onCalendarClose(): void {
        this.openDatePicker = false;
        this.inputDisabled = false;
    }
}
