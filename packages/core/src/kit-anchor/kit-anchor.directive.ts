import { Directive, ElementRef, Input } from '@angular/core';

/**
 * Anchor for passing link to element to the overlay or similar.
 */
@Directive({
  selector: '[kitAnchor]',
  exportAs: 'anchor',
})
export class KitAnchorDirective {
  @Input() kitAnchor: any;

  constructor(private _elementRef: ElementRef) {
  }

  get elementRef(): ElementRef {
    return this._elementRef;
  }

  /**
   * Get anchored html-element.
   */
  get nativeEl() {
    return this._elementRef.nativeElement;
  }
}
