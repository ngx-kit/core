import { Injectable } from '@angular/core';
import { KitComponentService, KitCoreService, KitThemeProps } from '@ngx-kit/core';

import { KitListTheme } from './interfaces';

@Injectable()
export class KitListService extends KitComponentService<KitListTheme> {

  private themeProps: KitThemeProps;

  constructor(private kitCore: KitCoreService) {
    super();
  }

  private compileTheme() {
    this.theme = {
      host: {
        base: {
        },
      }
    };
  }

}
