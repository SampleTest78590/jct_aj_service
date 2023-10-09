export enum Positions {
    topStart = 'top-start',
    top = 'top',
    topEnd = 'top-end',
    rightStart = 'right-start',
    right = 'right',
    rightEnd = 'right-end',
    bottomStart = 'bottom-start',
    bottom = 'bottom',
    bottomEnd = 'bottom-end',
    leftStart = 'left-start',
    left = 'left',
    leftEnd = 'left-end',
}

/**
 * Function to return modals top and left position
 * @param anchorRect - DOMRect of anchor
 * @param modalRect - DOMRect of modal
 * @param position - any position among 12 positions
 */
export function getModalPosition(
    anchorRect: DOMRect,
    modalRect: DOMRect,
    position: Positions = Positions.bottom
): { top: number; left: number } {
    let top = 0;
    let left = 0;
    switch (position) {
        // top position calculation
        case Positions.top:
            top = anchorRect.top - modalRect.height;
            left = anchorRect.left + anchorRect.width / 2 - modalRect.width / 2;
            break;
        case Positions.topStart:
            top = anchorRect.top - modalRect.height;
            left = anchorRect.left;
            break;
        case Positions.topEnd:
            top = anchorRect.top - modalRect.height;
            left = anchorRect.left + anchorRect.width - modalRect.width;
            break;
        // bottom position calculation
        case Positions.bottom:
            top = anchorRect.top + anchorRect.height;
            left = anchorRect.left + anchorRect.width / 2 - modalRect.width / 2;
            break;
        case Positions.bottomStart:
            top = anchorRect.top + anchorRect.height;
            left = anchorRect.left;
            break;
        case Positions.bottomEnd:
            top = anchorRect.top + anchorRect.height;
            left = anchorRect.left + anchorRect.width - modalRect.width;
            break;
        // left position calculation
        case Positions.left:
            top = anchorRect.top + anchorRect.height / 2 - modalRect.height / 2;
            left = anchorRect.left - modalRect.width;
            break;
        case Positions.leftStart:
            top = anchorRect.top;
            left = anchorRect.left - modalRect.width;
            break;
        case Positions.leftEnd:
            top = anchorRect.top + anchorRect.height - modalRect.height;
            left = anchorRect.left - modalRect.width;
            break;
        // right position calculation
        case Positions.right:
            top = anchorRect.top + anchorRect.height / 2 - modalRect.height / 2;
            left = anchorRect.left + anchorRect.width;
            break;
        case Positions.rightStart:
            top = anchorRect.top;
            left = anchorRect.left + anchorRect.width;
            break;
        case Positions.rightEnd:
            top = anchorRect.top + anchorRect.height - modalRect.height;
            left = anchorRect.left + anchorRect.width;
            break;
    }
    return {
        top: Math.round(top >= 0 ? top : 0),
        left: Math.round(left >= 0 ? left : 0),
    };
}
export const makeClass: (
     classes: Array<string | boolean | undefined>
    ) => string = (classes: Array<string | boolean | undefined>) =>
     classes
     .filter((e) => e)
     .join(' ')
     .trim();