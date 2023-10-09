import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

export interface MenuBlockItem {
    type?: 'entry' | 'divider' | undefined;
    icon?: string;
    label?: any;
    value?: string;
    disabled?: boolean;
    [key: string]: unknown;
    children?: MenuBlockChildItem;
}

export interface MenuBlockChildItem {
    position?: 'right';
    show?: boolean;
    items: MenuBlockItem[];
}

@Component({
    selector: 'app-custom-menu-block',
    templateUrl: './custom-menu-block.component.html',
    styleUrls: ['./custom-menu-block.component.scss'],
})
export class CustomMenuBlockComponent implements OnInit {
    @Input() open: boolean = false;
    @Input() items: Array<MenuBlockItem> = [];
    @Input() selectedIndex: number = -1;
    @Input() anchorEl: any;
    @Input() anchorPosition: string = 'bottom';
    @Input() isRemoveOverlay = false;

    @Output() itemSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() blockClose: EventEmitter<any> = new EventEmitter<any>();

    showChildItemIndex: any = -1;

    constructor() {}

    ngOnInit(): void {}

    onItemSelect(item: MenuBlockItem, index: number | undefined): void {
        if (item.children && item.children.items) {
            this.showChildItemIndex = index;
        } else {
            this.itemSelect.emit(item);
            this.onBlockClose();
        }
    }

    onBlockClose(): void {
        this.blockClose.emit();
    }

    handleScrollList(event: Event) {
        event.stopPropagation();
    }

    childItemSelect(item: MenuBlockItem): void {
        this.onItemSelect(item, void 0);
    }
}
