import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KitDefaultThemeModule, KitFullForRootModule } from '@ngx-kit/ngx-kit';
import { MdRenderModule } from '@nvxme/ngx-md-render';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { RootComponent } from './root/root.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: '_website'}),
    BrowserAnimationsModule,
    HttpClientModule,
    KitFullForRootModule,
    KitDefaultThemeModule.forRoot(),
    MdRenderModule,
    CoreModule,
    AppRoutingModule,
  ],
  declarations: [
    RootComponent,
  ],
  providers: [],
  bootstrap: [RootComponent],
})
export class AppModule {
}
