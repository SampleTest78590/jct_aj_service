import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';

interface IconConfig {
    color?: string;
    ic?: string;
}
interface HeaderTitleConfig {
    appearance: string;
    color: string;
}

@Component({
    selector: 'app-expaned-collapse',
    templateUrl: './expaned-collapse.component.html',
    styleUrls: ['./expaned-collapse.component.scss'],
})
export class ExpanedCollapseComponent implements OnChanges {
    @Input() title: string = '';
    @Input() isExpanded: boolean = false;
    @Input() isShowLoader: boolean = false;
    @Input() isSelected: boolean = false;
    @Input() isActiveMenu:boolean = false;

    @Input() headerTitleConfig: HeaderTitleConfig = {
        appearance: 'body-xs',
        color: 'primary-grey-100',
    };
    @Input() icon: IconConfig | undefined | null;
    @Input() className: string = '';

    @Output() expandCollapse = new EventEmitter<any>();
    @Input() isDisabled : number = 1;
    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes['title'] &&
            changes['title'].currentValue !== changes['title'].previousValue
        ) {
            this.title = changes['title'].currentValue;
        }

        if (
            changes['isExpanded'] &&
            changes['isExpanded'].currentValue !==
                changes['isExpanded'].previousValue
        ) {
            this.isExpanded = changes['isExpanded'].currentValue;
        }

        if (
            changes['isShowLoader'] &&
            changes['isShowLoader'].currentValue !==
                changes['isShowLoader'].previousValue
        ) {
            this.isShowLoader = changes['isShowLoader'].currentValue;
        }

        if (
            changes['isSelected'] &&
            changes['isSelected'].currentValue !==
                changes['isSelected'].previousValue
        ) {
            this.isSelected = changes['isSelected'].currentValue;
        }

        if (
            changes['className'] &&
            changes['className'].currentValue !==
                changes['className'].previousValue
        ) {
            this.className = changes['className'].currentValue;
        }

        if (changes['icon']?.currentValue) {
            this.icon = changes['icon'].currentValue;
        }

        if (changes['headerTitleConfig']?.currentValue) {
            this.headerTitleConfig = changes['headerTitleConfig'].currentValue;
        }
    }

    onExpandCollapseClick() {
        this.isExpanded = !this.isExpanded;
        if (this.expandCollapse.observed) {
            this.expandCollapse.emit(this.isExpanded);
        }
    }
}
