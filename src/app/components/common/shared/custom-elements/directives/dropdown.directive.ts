import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from "@angular/core";

@Directive({
    selector: "[appDropdown]",
    exportAs: "appDropDown"
})
export class DropdownDirective {
    private wasInside = false;

    @HostBinding("class.show") isOpen = false;

    @HostListener("click") toggleOpen() {
        setTimeout(() => {
            const dropdownMenu = this.el.nativeElement.querySelector('.dropdown-content');

            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.renderer.addClass(dropdownMenu, 'show');
            } else {
                this.renderer.removeClass(dropdownMenu, 'show')
            }
            this.wasInside = true;
            const dropdownRect = dropdownMenu.getBoundingClientRect();

            // Get the window dimensions
            const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            // Calculate the position of the drop-down menu
            let top = dropdownRect.top + dropdownRect.height;
            let dropdownPosition = 40;

            // Check if the drop-down menu goes beyond the bottom edge of the window
            if (top + 70 > windowHeight) {
                dropdownPosition = windowHeight - (dropdownRect.top + dropdownRect.height + 70);
            }
            if (dropdownPosition != 40)
                this.renderer.setStyle(dropdownMenu, 'top', dropdownPosition + 'px');
        }, 0);


    }

    @HostListener("document:click") clickout() {
        const dropdownMenu = this.el.nativeElement.querySelector('.dropdown-content');
        if (!this.wasInside) {
            this.isOpen = false;
        }
        this.renderer.removeClass(dropdownMenu, 'show');
        this.renderer.removeStyle(dropdownMenu, 'top')

        this.wasInside = false;
    }
    constructor(private el: ElementRef, private renderer: Renderer2) { }
}
