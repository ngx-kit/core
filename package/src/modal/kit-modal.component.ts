import { Component, HostBinding, Inject, Input, OnInit } from '@angular/core';
import { StylerComponent } from '@ngx-kit/styler';
import { KitComponentStyle } from '../core/meta/component';
import { kitModalStyle } from '../core/meta/tokens';

@Component({
  selector: 'kit-modal,[kitModal]',
  template: `
    <kit-overlay [template]="modalRef"
                 [type]="'center'"
                 [overlay]="true"
                 [opened]="opened"
                 (outsideClick)="close()"></kit-overlay>
    <ng-template #modalRef>
      <div styler="modal">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  viewProviders: [
    StylerComponent,
  ],
})
export class KitModalComponent implements OnInit {
  @HostBinding('class') hostClass: string;

  @Input() kitModal: any;

  @Input() opened = false;

  constructor(private styler: StylerComponent,
              @Inject(kitModalStyle) private style: KitComponentStyle) {
    this.styler.classPrefix = 'kit-modal';
    this.styler.register(this.style);
  }

  ngOnInit() {
  }

  close() {
    this.opened = false;
  }

  open() {
    this.opened = true;
  }
}
