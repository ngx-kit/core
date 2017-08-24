import { Component, Inject, Input, OnInit } from '@angular/core';
import { StylerComponent } from '@ngx-kit/styler';
import { KitComponentStyle } from '../core/meta/component';
import { kitFormGroupStyle } from '../core/meta/tokens';

@Component({
  selector: 'kit-form-label,[kitFormLabel]',
  template: `
    <ng-content></ng-content>
  `,
  viewProviders: [
    StylerComponent,
  ],
})
export class KitFormLabelComponent implements OnInit {
  @Input() kitFormLabel: any;

  constructor(private styler: StylerComponent,
              @Inject(kitFormGroupStyle) private style: KitComponentStyle) {
    this.styler.classPrefix = 'kit-form-label';
    this.styler.register(this.style);
  }

  ngOnInit() {
  }
}
