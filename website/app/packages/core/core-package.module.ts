import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KitIconsModule } from '@ngx-kit/core';
import { ContentServiceBase } from '../../content/content';
import { SharedModule } from '../../shared/shared.module';
import { CoreContentService } from './core-content.service';
import { CorePackageRoutingModule } from './core-package-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CorePackageRoutingModule,
    KitIconsModule,
  ],
  declarations: [
    MainComponent,
  ],
  providers: [
    {
      provide: ContentServiceBase,
      useClass: CoreContentService,
    },
  ],
})
export class CorePackageModule {
}
