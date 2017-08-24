import { Component, Inject, Input, OnInit, } from '@angular/core';
import { StylerComponent } from '@ngx-kit/styler';
import { kitModalHeaderStyle } from '../core/meta/tokens';
import { KitComponentStyle } from '../core/meta/component';

@Component({
  selector: 'kit-modal-header,[kitModalHeader]',
  template: `
    <ng-content></ng-content>
  `,
  viewProviders: [
    StylerComponent,
  ],
})
export class KitModalHeaderComponent implements OnInit {
  @Input() kitModalHeader: any;

  constructor(private styler: StylerComponent,
              @Inject(kitModalHeaderStyle) private style: KitComponentStyle) {
    this.styler.classPrefix = 'kit-modal-header';
    this.styler.register(this.style);
  }

  ngOnInit() {
  }
}
