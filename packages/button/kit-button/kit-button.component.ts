import { Component, HostBinding, Inject, Input, OnInit } from '@angular/core';

import { KitTheme, KitThemeService } from '@ngx-kit/core';
import { StylerElement, StylerComponent } from '@ngx-kit/styler';

@Component({
  selector: 'kit-button',
  template: `
    <ng-content></ng-content>
  `,
  viewProviders: [
    StylerComponent,
  ],
})
export class KitButtonComponent implements OnInit {

  @Input() set size(size: string) {
    this.styler.host.applyState({size});
  }

  @Input() set type(type: string) {
    this.styler.host.applyState({type});
  }

  @Input() set disabled(disabled: boolean) {
    this.styler.host.applyState({disabled});
  }

  @HostBinding('attr.sid') get hostClass() {
    return this.styler.host.sid;
  };

  constructor(private styler: StylerComponent,
              @Inject(KitTheme) private theme: KitThemeService) {
    this.theme.style('button', this.styler);
  }

  ngOnInit() {
  }

}
