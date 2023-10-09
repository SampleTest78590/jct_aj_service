import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppInitService } from './core/services/app-init.service';
import { HttpClientModule } from '@angular/common/http';
import { HrssInterceptor } from './core/interceptor/hrssInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonService } from './core/services/common.service';
import { LoadingSpinnerService } from './components/common/shared/loading-spinner/loading-spinner.service';
import { LoginGuardService } from './core/services/loginGuard.service';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { HeaderComponent } from './components/common/header/header.component';
import { LoadingSpinnerComponent } from './components/common/shared/loading-spinner/loading-spinner.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ValidationDirective } from './validation.directive';
import { ClickOutsideModule } from 'ng-click-outside';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CustomElementsModule } from './components/common/shared/custom-elements/custom-elements.module';
import { FlexLayoutModule } from '@angular/flex-layout';


export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HrssInterceptor, multi: true },
];
export function init(appInitService: AppInitService) {
  return () => appInitService.init();
}
export function loadUrls(appInitService: AppInitService) {
  return () => appInitService.loadUrls();
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    LoadingSpinnerComponent,
    ValidationDirective
  ],
  imports: [
    BrowserModule,//for local
    BrowserAnimationsModule,//for local
    // RouterModule.forChild(routes),//for local
    HttpClientModule,
    RouterModule.forRoot(routes),
    InfiniteScrollModule,
    ClickOutsideModule,
    // NgIdleModule.forRoot(),
    // ShareComponentModule,
    CustomElementsModule, FlexLayoutModule
  ],
  providers: [
    AppInitService,

    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [AppInitService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadUrls,
      deps: [AppInitService],
      multi: true,
    },
    CommonService,
    LoadingSpinnerService,
    LoginGuardService,
    interceptorProviders,
  ],
  bootstrap: [AppComponent],
  // exports: [CustomElementsModule]
})
export class AppModule { }
