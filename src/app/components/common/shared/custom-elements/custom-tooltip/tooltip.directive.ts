import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    ElementRef,
    EmbeddedViewRef,
    HostListener,
    Injector,
    Input,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipPosition } from './tooltip/enums/tooltip-constants';

@Directive({
    selector: '[appTooltip]',
})
export class TooltipDirective implements OnDestroy {
    @Input() tooltipTemplate: HTMLElement | string | null = null;
    @Input() tooltipPosition: string = TooltipPosition.DEFAULT;
    @Input() tooltipStyleClass: string = '';
    @Input() showDelay = 0;
    @Input() hideDelay = 0;
    @Input() anchorElement: HTMLElement;
    @Input() tooltipDisable: boolean = false;
    @Input() showTooltipOnEllipsis: boolean = false;

    private componentRef: ComponentRef<any> | null = null;
    private showTimeout?: number;
    private hideTimeout?: number;
    private touchTimeout?: number;

    @ViewChild('customTooltip') tooltipRef: ElementRef;

    constructor(
        private elementRef: ElementRef,
        private appRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector
    ) {}

    @HostListener('mouseenter')
    onMouseEnter(): void {
        if (this.showTooltipOnEllipsis){
            // show tooltip when text grow height-wise or width-wise and gets ellipsis
            if (this.elementRef.nativeElement.scrollWidth > this.elementRef.nativeElement.clientWidth){
                this.initializeTooltip();
            }else if (this.elementRef.nativeElement.scrollHeight > this.elementRef.nativeElement.clientHeight){
                this.initializeTooltip();
            }
        }
        else{
            this.initializeTooltip();
        }
    }

    @HostListener('touchstart', ['$event'])
    onTouchStart($event: TouchEvent): void {
        $event.preventDefault();
        window.clearTimeout(this.touchTimeout);
        this.touchTimeout = window.setTimeout(
            this.initializeTooltip.bind(this),
            500
        );
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        this.setHideTooltipTimeout();
    }

    @HostListener('touchend')
    onTouchEnd(): void {
        window.clearTimeout(this.touchTimeout);
        this.setHideTooltipTimeout();
    }

    initializeTooltip() {
        if (this.componentRef === null && !this.tooltipDisable) {
            window.clearInterval(this.hideDelay);

            // To make the Tooltip component
            const componentFactory =
                this.componentFactoryResolver.resolveComponentFactory(
                    TooltipComponent
                );

            // Using above code to create the component then passing the dependency injector
            this.componentRef = componentFactory.create(this.injector);

            // Attaching the component to the virtual DOM of the whole app, via appRef
            this.appRef.attachView(this.componentRef.hostView);
            const [tooltipDOMElement] = (
                this.componentRef.hostView as EmbeddedViewRef<any>
            ).rootNodes;

            this.setTooltipComponentProperties();

            // Attaching  the component to the real DOM via document.body.appendChild
            document.body.appendChild(tooltipDOMElement);
            this.showTimeout = window.setTimeout(
                this.showTooltip.bind(this),
                this.showDelay
            );
        }
    }

    setTooltipComponentProperties() {
        if (this.componentRef !== null) {
            // Assign the values taken as @Input in the directive to variables in component
            this.componentRef.instance.tooltip = this.tooltipTemplate;
            this.componentRef.instance.position = this.tooltipPosition;
            this.componentRef.instance.tooltipClass = this.tooltipStyleClass;
            this.componentRef.instance.anchorElement = this.anchorElement;

            // getBoundingClientRect() is used to get the HTML element location, based on which tooltip coordinates are calculated relative to a browser window
            const { left, right, top, bottom } =
                this.elementRef.nativeElement?.getBoundingClientRect();

            // Assigning values to top and left attributes of tooltip
            switch (this.tooltipPosition) {
                case TooltipPosition.BOTTOM: {
                    this.componentRef.instance.left = Math.round(
                        (right - left) / 2 + left
                    );
                    this.componentRef.instance.top = Math.round(bottom);
                    break;
                }
                case TooltipPosition.TOP: {
                    this.componentRef.instance.left = Math.round(
                        (right - left) / 2 + left
                    );
                    this.componentRef.instance.top = Math.round(top);
                    break;
                }
                case TooltipPosition.RIGHT: {
                    this.componentRef.instance.left = Math.round(right);
                    this.componentRef.instance.top = Math.round(
                        top + (bottom - top) / 2
                    );
                    break;
                }
                case TooltipPosition.LEFT: {
                    this.componentRef.instance.left = Math.round(left);
                    this.componentRef.instance.top = Math.round(
                        top + (bottom - top) / 2
                    );
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }

    showTooltip() {
        // This is for showing the instance of tooltip component
        if (this.componentRef !== null) {
            this.componentRef.instance.visible = true;
        }
    }

    setHideTooltipTimeout() {
        // This is for hiding the instance of tooltip component
        this.hideTimeout = window.setTimeout(
            this.destroy.bind(this),
            this.hideDelay
        );
    }

    ngOnDestroy(): void {
        this.destroy();
    }

    destroy(): void {
        if (this.componentRef !== null) {
            // It Clears and destroys time interval and component reference
            window.clearInterval(this.showTimeout);
            window.clearInterval(this.hideDelay);
            this.appRef.detachView(this.componentRef.hostView);
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }
}
