import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-numeric-code',
    templateUrl: './numeric-code.component.html',
    styleUrls: ['./numeric-code.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NumericCodeComponent),
            multi: true,
        },
    ],
})
export class NumericCodeComponent implements OnInit, ControlValueAccessor {
    @Input() numberOfCodes: number = 4;
    @Input() disabled: boolean = false;
    @Input() state: string = '';
    @Input() errorText: string = '';

    @Output() inputChange = new EventEmitter<any>();

    @ViewChildren('otpInputs') otpInputs: any;
    numericCodeArr: any = [];
    otpInputValues: any = [];

    private readonly KEY_BACKSPACE = 'Backspace';
    private readonly KEY_ARROWLEFT = 'ArrowLeft';
    private readonly KEY_ARROWRIGHT = 'ArrowRight';
    private readonly KEY_SPACE = ' ';
    private readonly INVALID = 'INVALID';
    private readonly UNIDENTIFIED = 'Unidentified';
    private readonly KEY_TAB = 'Tab';

    constructor() {}

    ngOnInit(): void {
        this.numericCodeArr = new Array(this.numberOfCodes);
        this.otpInputValues = new Array(this.numberOfCodes).fill('');
    }

    writeValue(value: any): void {
        if (value) {
            const code = value ? `${value}` : '';
            this.otpInputValues = code
                .split('')
                .map((c) => (isNaN(parseInt(c)) ? ' ' : parseInt(c)));
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

    isNumberKey(event: any): boolean {
        const key = event.key;
        return (
            key !== this.KEY_SPACE && parseInt(key) >= 0 && parseInt(key) <= 9
        );
    }

    onKeyDown(event: any): void {
        if (event.key === this.KEY_TAB) {
            return;
        }
    }

    onKeyUp(event: any, index: number): void {
        const target = event.target as HTMLInputElement;
        const nextInput = this.otpInputs._results[index + 1];
        const prevInput = this.otpInputs._results[index - 1];

        // consider target value when key is undefined
        // Unidentified comes in some mobile keyboards
        let key =
            event.key === this.UNIDENTIFIED
                ? target.value.charAt(target.value.length - 1)
                : event.key;

        // to detect backspace in mobile devices with non-google keyboard
        if (event.key === this.UNIDENTIFIED && !key) {
            key = this.KEY_BACKSPACE;
        }

        switch (key) {
            case this.KEY_BACKSPACE:
                prevInput && prevInput.nativeElement.select();
                break;
            case this.KEY_ARROWLEFT:
                prevInput && prevInput.nativeElement.select();
                return;
            case this.KEY_ARROWRIGHT:
                nextInput && nextInput.nativeElement.select();
                return;
            case this.KEY_TAB:
                return;
            default:
                break;
        }

        if (
            key !== this.KEY_SPACE &&
            parseInt(key) >= 0 &&
            parseInt(key) <= 9
        ) {
            nextInput && nextInput.nativeElement.select();
        }

        const numericVal = parseInt(key);

        if (isNaN(numericVal) && key !== this.KEY_BACKSPACE) {
            return;
        }

        this.otpInputValues[index] =
            key === this.KEY_BACKSPACE ? ' ' : numericVal;

        this.otpInputValues = [...this.otpInputValues].map((item) =>
            isNaN(parseInt('' + item)) ? ' ' : item
        );

        const value = this.otpInputValues.join('').trimEnd();

        this.propagateChange(value);
        this.propagateTouched(value);
        this.inputChange.emit(value);
    }
}
