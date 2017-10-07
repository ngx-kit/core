import { ChangeDetectionStrategy, Component, HostListener, Input, } from '@angular/core';
import { KitCollapseItemService } from '@ngx-kit/ngx-kit';

/**
 * Accordion title.
 *
 * @apiOrder 3
 */
@Component({
  selector: 'kit-accordion-title',
  template: '<ng-content></ng-content>',
  styleUrls: ['./kit-accordion-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitAccordionTitleComponent {
  constructor(private item: KitCollapseItemService) {
  }

  @HostListener('click')
  clickHandler() {
    this.item.toggle();
  }
}
