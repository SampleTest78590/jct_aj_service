// import { NgModule, APP_INITIALIZER } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AppComponent } from './app.component';
// import { CoreModule } from './core.module';
// import { AppInitService } from './core/services/app-init.service';
// import { HttpClientModule } from '@angular/common/http';
// import { HrssInterceptor } from './core/interceptor/hrssInterceptor';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { CommonService } from './core/services/common.service';
// import { LoadingSpinnerService } from './components/common/shared/loading-spinner/loading-spinner.service';
// import { LoginGuardService } from './core/services/loginGuard.service';
// import { NgIdleModule } from '@ng-idle/core';
// import { RouterModule } from '@angular/router';
// import { routes } from './routes';
// import { ShareComponentModule } from './share-component.module';

// export const interceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: HrssInterceptor, multi: true },
// ];
// export function init(appInitService: AppInitService) {
//   return () => appInitService.init();
// }
// export function loadUrls(appInitService: AppInitService) {
//   return () => appInitService.loadUrls();
// }
// @NgModule({
//   declarations: [
//     // ComponentLoadDirective
//   ],
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     CoreModule,
//     HttpClientModule,
//     ShareComponentModule,
//     // NgIdleModule.forRoot(),
//     RouterModule.forChild(routes),
    
//   ],
//   providers: [
//     AppInitService,

//     {
//       provide: APP_INITIALIZER,
//       useFactory: init,
//       deps: [AppInitService],
//       multi: true,
//     },
//     {
//       provide: APP_INITIALIZER,
//       useFactory: loadUrls,
//       deps: [AppInitService],
//       multi: true,
//     },
//     CommonService,
//     LoadingSpinnerService,
//     LoginGuardService,
//     interceptorProviders,
//   ],
//   bootstrap: [AppComponent],
//   // exports: [ComponentLoadDirective]
// })
// export class AppChildModule {}
