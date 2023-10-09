import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { makeClass } from '../../move-in-viewport/helper';
import { TooltipPosition } from './enums/tooltip-constants';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit, AfterViewInit {
    position: TooltipPosition = TooltipPosition.DEFAULT;
    tooltip: HTMLElement | string | null = null;
    tooltipClass: string = '';
    left = 0;
    top = 0;
    visible = false;
    anchorElement: HTMLElement;

    @ViewChild('customTooltip') tooltipRef: ElementRef;

    get contentClasses(): string {
        return makeClass(['tooltip__content']);
    }

    constructor(private cdr: ChangeDetectorRef) {}
    ngOnInit(): void {}

    ngAfterViewInit(): void {
        // this.checkTooltipPosition();
    }

    checkTooltipPosition(): void {
        const componentRect = this.anchorElement.getBoundingClientRect();
        const tooltipRect =
            this.tooltipRef.nativeElement.getBoundingClientRect();

        const componentRightX =
            componentRect.x + componentRect.width + tooltipRect.width;
        if (componentRightX > window.innerWidth) {
            this.position = TooltipPosition.BOTTOM;
            this.cdr.detectChanges();
        }
    }
}
