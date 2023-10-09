import { Component, Input, OnInit } from '@angular/core';
import { makeClass } from '../move-in-viewport/helper';

export enum Appearance {
    inline = 'inline',
    normal = 'normal',
    vibrant = 'vibrant',
}

export enum SpinnerLabelPositions {
    bottom = 'bottom',
    right = 'right',
}

export enum SpinnerSizes {
    small = 'small',
    medium = 'medium',
    xs = 'xs',
}

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
    @Input() className: string = '';
    /**
     * Determines the appearance of the spinner
     * `inline`   inherit from text color
     * `normal`   single color
     * `vibrant`  three color
     */
    @Input() appearance: Appearance | keyof typeof Appearance =
        Appearance.normal;

    /**
     * Determines the label
     */
    @Input() label?: string;

    /**
     * Determines the position of the label
     */
    @Input() labelPosition?:
        | SpinnerLabelPositions
        | keyof typeof SpinnerLabelPositions = SpinnerLabelPositions.right;

    /**
     * Adjusts the size of the spinner
     */
    @Input() size?: SpinnerSizes | keyof typeof SpinnerSizes =
        SpinnerSizes.medium;

    public get classes(): string {
        return makeClass([
            'spinner', // Prettier
            this.className,
            this.appearance && `spinner-appearance__${this.appearance}`,
            this.size && `spinner-size__${this.size}`,
            this.size === SpinnerSizes.medium
                ? this.labelPosition === SpinnerLabelPositions.bottom
                    ? 'spinner-has-label-bottom'
                    : 'spinner-has-label-right'
                : 'spinner-has-label-right',
        ]);
    }
    constructor() {}

    ngOnInit(): void {}
}
