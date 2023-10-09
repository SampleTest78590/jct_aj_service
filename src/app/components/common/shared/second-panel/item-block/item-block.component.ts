import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-item-block',
    templateUrl: './item-block.component.html',
    styleUrls: ['./item-block.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host : {'class':'item-block'}
})
export class ItemBlockComponent {
    @Input() label: string = '';
    @Input() icon: string | null | undefined;
    @Input() isSelected: boolean = false;
    @Input() ellipseColor: string = '#3535F3';
    @Input() isEllipse: boolean = false;
    @Input() disableTooltip: boolean = false;
    @Input() className: string = '';
    @Input() activeMenu : number = 1;

    constructor() {}
}
