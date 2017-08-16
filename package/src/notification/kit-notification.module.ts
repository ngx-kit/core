import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { StylerModule } from '@ngx-kit/styler';
import { KitCoreModule } from '../core/kit-core.module';
import { KitNotificationHostComponent } from './kit-notification-host.component';
import { KitNotificationService } from './kit-notification.service';

const entries = [
  KitNotificationHostComponent,
];

@NgModule({
  imports: [
    CommonModule,
    StylerModule,
    KitCoreModule,
  ],
  exports: [],
  declarations: [
    ...entries,
  ],
  entryComponents: [
    ...entries,
  ],
  providers: [],
})
export class KitNotificationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: KitNotificationModule,
      providers: [KitNotificationService],
    };
  }
}